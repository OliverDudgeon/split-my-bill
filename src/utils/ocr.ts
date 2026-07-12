import Tesseract from 'tesseract.js';

export interface OcrProgress {
  status: string;
  progress?: number;
}

const maximumImageWidth = 2200;
const maximumImageHeight = 5600;
const minimumImageWidth = 1800;
const ocrCacheName = 'split-my-bill-ocr-assets';
const ocrAssetPathsToCache = [
  'worker.min.js',
  'core/tesseract-core-lstm.wasm.js',
  'core/tesseract-core-simd-lstm.wasm.js',
  'core/tesseract-core-relaxedsimd-lstm.wasm.js',
  'lang/eng.traineddata.gz',
];
const recognitionLanguages = 'eng';

interface Bounds {
  height: number;
  left: number;
  top: number;
  width: number;
}

let workerPromise: Promise<Tesseract.Worker> | undefined;
let progressListener: ((progress: OcrProgress) => void) | undefined;

const getOcrAssetUrl = (path: string): string => `${import.meta.env.BASE_URL}ocr/${path}`;

interface LoadedReceiptImage {
  width: number;
  height: number;
  close: () => void;
  draw: (context: CanvasRenderingContext2D, width: number, height: number) => void;
}

function reportProgress(status: string, progress?: number): void {
  progressListener?.({ status, progress });
}

async function getWorker(onProgress: (progress: OcrProgress) => void): Promise<Tesseract.Worker> {
  progressListener = onProgress;

  if (!workerPromise) {
    workerPromise = Tesseract.createWorker(recognitionLanguages, 1, {
      cacheMethod: 'write',
      corePath: getOcrAssetUrl('core'),
      gzip: true,
      langPath: getOcrAssetUrl('lang'),
      logger: ({ progress, status }) => reportProgress(status, progress),
      workerBlobURL: false,
      workerPath: getOcrAssetUrl('worker.min.js'),
    })
      .then(async (worker) => {
        await setGeneralOcrParameters(worker);
        return worker;
      })
      .catch((error: unknown) => {
        workerPromise = undefined;
        throw error;
      });
  }

  return workerPromise;
}

async function setGeneralOcrParameters(worker: Tesseract.Worker): Promise<void> {
  await worker.setParameters({
    preserve_interword_spaces: '1',
    tessedit_char_whitelist: '',
    tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
    user_defined_dpi: '300',
  });
}

async function cacheOcrAssets(): Promise<void> {
  if (!('caches' in globalThis)) {
    return;
  }

  try {
    const cache = await caches.open(ocrCacheName);
    await Promise.all(
      ocrAssetPathsToCache.map(async (assetPath) => {
        const assetUrl = getOcrAssetUrl(assetPath);
        if (await cache.match(assetUrl)) {
          return;
        }

        await cache.add(assetUrl).catch(() => {});
      }),
    );
  } catch {
    // The service worker still runtime-caches these assets when available.
  }
}

function getTargetSize(width: number, height: number): { width: number; height: number } {
  const minimumScale = width < minimumImageWidth ? minimumImageWidth / width : 1;
  const maximumScale = Math.min(maximumImageWidth / width, maximumImageHeight / height, 1);
  const scale = Math.max(Math.min(minimumScale, maximumScale), 0.1);

  return {
    height: Math.round(height * scale),
    width: Math.round(width * scale),
  };
}

function smoothScores(scores: number[], radius: number): number[] {
  const prefixTotals = [0];

  for (const score of scores) {
    prefixTotals.push((prefixTotals.at(-1) ?? 0) + score);
  }

  return scores.map((_, index) => {
    const left = Math.max(0, index - radius);
    const right = Math.min(scores.length - 1, index + radius);

    return (prefixTotals[right + 1] - prefixTotals[left]) / (right - left + 1);
  });
}

function getSegments(scores: number[], threshold: number, minimumLength: number) {
  const segments: { end: number; start: number }[] = [];
  let start: number | undefined;

  for (const [index, score] of scores.entries()) {
    if (score >= threshold && start === undefined) {
      start = index;
    } else if (score < threshold && start !== undefined) {
      if (index - start >= minimumLength) {
        segments.push({ end: index - 1, start });
      }
      start = undefined;
    }
  }

  if (start !== undefined && scores.length - start >= minimumLength) {
    segments.push({ end: scores.length - 1, start });
  }

  return segments;
}

function isReceiptPaperPixel(data: Uint8ClampedArray, index: number): boolean {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const brightness = (red + green + blue) / 3;
  const saturation = maximum - minimum;

  return brightness > 125 && maximum > 145 && minimum > 85 && saturation < 75;
}

function getBestSegment(
  segments: { end: number; start: number }[],
  scores: number[],
  fullSize: number,
): { end: number; start: number } | undefined {
  let bestSegment: { end: number; start: number } | undefined;
  let bestScore = 0;

  for (const segment of segments) {
    const length = segment.end - segment.start + 1;
    const midpoint = segment.start + length / 2;
    const centerDistance = Math.abs(midpoint - fullSize / 2) / (fullSize / 2);
    const centerWeight = 1 - Math.min(centerDistance, 1) * 0.45;
    const lengthRatio = length / fullSize;
    const lengthWeight = lengthRatio > 0.04 && lengthRatio < 0.7 ? 1 : 0.3;
    const segmentScore = scores
      .slice(segment.start, segment.end + 1)
      .reduce((total, score) => total + score, 0);
    const weightedScore = segmentScore * centerWeight * lengthWeight;

    if (weightedScore > bestScore) {
      bestScore = weightedScore;
      bestSegment = segment;
    }
  }

  return bestSegment;
}

function addPadding(bounds: Bounds, canvas: HTMLCanvasElement): Bounds {
  const horizontalPadding = Math.round(bounds.width * 0.08);
  const verticalPadding = Math.round(bounds.height * 0.025);
  const left = Math.max(0, bounds.left - horizontalPadding);
  const top = Math.max(0, bounds.top - verticalPadding);
  const right = Math.min(canvas.width, bounds.left + bounds.width + horizontalPadding);
  const bottom = Math.min(canvas.height, bounds.top + bounds.height + verticalPadding);

  return {
    height: bottom - top,
    left,
    top,
    width: right - left,
  };
}

function findReceiptBounds(canvas: HTMLCanvasElement): Bounds | undefined {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return undefined;
  }

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const columnScores = Array.from({ length: canvas.width }).fill(0) as number[];

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4;
      if (isReceiptPaperPixel(image.data, index)) {
        columnScores[x] += 1;
      }
    }
  }

  const smoothedColumns = smoothScores(columnScores, Math.max(8, Math.round(canvas.width * 0.01)));
  const maximumColumnScore = Math.max(...smoothedColumns);
  const columnThreshold = Math.max(maximumColumnScore * 0.32, canvas.height * 0.08);
  const columnSegments = getSegments(
    smoothedColumns,
    columnThreshold,
    Math.max(20, Math.round(canvas.width * 0.04)),
  );
  const columnSegment = getBestSegment(columnSegments, smoothedColumns, canvas.width);

  if (!columnSegment) {
    return undefined;
  }

  const rowScores = Array.from({ length: canvas.height }).fill(0) as number[];
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = columnSegment.start; x <= columnSegment.end; x += 1) {
      const index = (y * canvas.width + x) * 4;
      if (isReceiptPaperPixel(image.data, index)) {
        rowScores[y] += 1;
      }
    }
  }

  const cropWidth = columnSegment.end - columnSegment.start + 1;
  const smoothedRows = smoothScores(rowScores, Math.max(8, Math.round(canvas.height * 0.005)));
  const maximumRowScore = Math.max(...smoothedRows);
  const rowThreshold = Math.max(maximumRowScore * 0.2, cropWidth * 0.08);
  const rowSegments = getSegments(
    smoothedRows,
    rowThreshold,
    Math.max(50, Math.round(canvas.height * 0.15)),
  );
  if (rowSegments.length === 0) {
    return undefined;
  }

  const rowSegment = rowSegments.toSorted((a, b) => b.end - b.start - (a.end - a.start))[0];

  return addPadding(
    {
      height: rowSegment.end - rowSegment.start + 1,
      left: columnSegment.start,
      top: rowSegment.start,
      width: cropWidth,
    },
    canvas,
  );
}

function findHistogramCutoff(histogram: number[], target: number): number {
  let count = 0;
  for (const [index, value] of histogram.entries()) {
    count += value;
    if (count >= target) {
      return index;
    }
  }
  return histogram.length - 1;
}

function preprocessCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return;
  }

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const histogram = Array.from({ length: 256 }).fill(0) as number[];

  for (let index = 0; index < image.data.length; index += 4) {
    const grey = Math.round(
      image.data[index] * 0.299 + image.data[index + 1] * 0.587 + image.data[index + 2] * 0.114,
    );
    histogram[grey] += 1;
  }

  const pixelCount = image.data.length / 4;
  const low = findHistogramCutoff(histogram, pixelCount * 0.01);
  const high = findHistogramCutoff(histogram, pixelCount * 0.99);
  const range = Math.max(high - low, 1);

  for (let index = 0; index < image.data.length; index += 4) {
    const grey = Math.round(
      image.data[index] * 0.299 + image.data[index + 1] * 0.587 + image.data[index + 2] * 0.114,
    );
    const adjusted = Math.min(Math.max(Math.round(((grey - low) * 255) / range), 0), 255);

    image.data[index] = adjusted;
    image.data[index + 1] = adjusted;
    image.data[index + 2] = adjusted;
  }

  context.putImageData(image, 0, 0);
}

function findBarcodeBottom(canvas: HTMLCanvasElement): number | undefined {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return undefined;
  }

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const maximumY = Math.round(canvas.height * 0.45);
  const rowScores = Array.from({ length: maximumY }).fill(0) as number[];

  for (let y = 0; y < maximumY; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4;
      const brightness = (image.data[index] + image.data[index + 1] + image.data[index + 2]) / 3;

      if (brightness < 85) {
        rowScores[y] += 1;
      }
    }
  }

  const smoothedRows = smoothScores(rowScores, Math.max(3, Math.round(canvas.height * 0.004)));
  const maximumRowScore = Math.max(...smoothedRows);
  if (maximumRowScore < canvas.width * 0.18) {
    return undefined;
  }

  const barcodeSegments = getSegments(
    smoothedRows,
    maximumRowScore * 0.55,
    Math.max(12, Math.round(canvas.height * 0.01)),
  );
  if (barcodeSegments.length === 0) {
    return undefined;
  }

  const barcodeSegment = barcodeSegments.toSorted((a, b) => {
    const scoreA = smoothedRows
      .slice(a.start, a.end + 1)
      .reduce((total, score) => total + score, 0);
    const scoreB = smoothedRows
      .slice(b.start, b.end + 1)
      .reduce((total, score) => total + score, 0);

    return scoreB - scoreA;
  })[0];

  return barcodeSegment.end;
}

function getRecognitionBounds(canvas: HTMLCanvasElement): Bounds {
  const barcodeBottom = findBarcodeBottom(canvas);
  if (barcodeBottom === undefined) {
    return {
      height: canvas.height,
      left: 0,
      top: 0,
      width: canvas.width,
    };
  }

  const top = Math.min(canvas.height - 1, barcodeBottom + Math.round(canvas.height * 0.025));
  const bottom = Math.min(canvas.height, Math.max(top + canvas.height * 0.3, canvas.height * 0.74));

  return {
    height: Math.round(bottom - top),
    left: 0,
    top,
    width: canvas.width,
  };
}

async function loadImageElement(file: File): Promise<LoadedReceiptImage> {
  const url = URL.createObjectURL(file);
  const image = new Image();

  try {
    await new Promise<void>((resolve, reject) => {
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener('error', () => reject(new Error('Could not load receipt image.')), {
        once: true,
      });
      image.src = url;
    });

    return {
      close: () => URL.revokeObjectURL(url),
      draw: (context, width, height) => context.drawImage(image, 0, 0, width, height),
      height: image.naturalHeight,
      width: image.naturalWidth,
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

async function loadReceiptImage(file: File): Promise<LoadedReceiptImage> {
  if ('createImageBitmap' in globalThis) {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });

      return {
        close: () => bitmap.close(),
        draw: (context, width, height) => context.drawImage(bitmap, 0, 0, width, height),
        height: bitmap.height,
        width: bitmap.width,
      };
    } catch {
      return loadImageElement(file);
    }
  }

  return loadImageElement(file);
}

async function prepareReceiptImage(file: File): Promise<HTMLCanvasElement> {
  reportProgress('Preparing receipt image', 0);

  const image = await loadReceiptImage(file);
  const sourceCanvas = document.createElement('canvas');
  sourceCanvas.width = image.width;
  sourceCanvas.height = image.height;

  const sourceContext = sourceCanvas.getContext('2d');
  if (!sourceContext) {
    image.close();
    throw new Error('Could not prepare image for OCR.');
  }

  image.draw(sourceContext, image.width, image.height);
  image.close();

  const bounds = findReceiptBounds(sourceCanvas) ?? {
    height: sourceCanvas.height,
    left: 0,
    top: 0,
    width: sourceCanvas.width,
  };
  const shouldRotateReceipt = bounds.width > bounds.height * 1.15;
  const size = shouldRotateReceipt
    ? getTargetSize(bounds.height, bounds.width)
    : getTargetSize(bounds.width, bounds.height);
  const receiptCanvas = document.createElement('canvas');
  receiptCanvas.width = size.width;
  receiptCanvas.height = size.height;

  const receiptContext = receiptCanvas.getContext('2d');
  if (!receiptContext) {
    throw new Error('Could not prepare image for OCR.');
  }

  if (shouldRotateReceipt) {
    receiptContext.translate(size.width, 0);
    receiptContext.rotate(Math.PI / 2);
    receiptContext.drawImage(
      sourceCanvas,
      bounds.left,
      bounds.top,
      bounds.width,
      bounds.height,
      0,
      0,
      size.height,
      size.width,
    );
  } else {
    receiptContext.drawImage(
      sourceCanvas,
      bounds.left,
      bounds.top,
      bounds.width,
      bounds.height,
      0,
      0,
      size.width,
      size.height,
    );
  }

  const recognitionBounds = getRecognitionBounds(receiptCanvas);
  const canvas = document.createElement('canvas');
  canvas.width = recognitionBounds.width;
  canvas.height = recognitionBounds.height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not prepare image for OCR.');
  }

  context.drawImage(
    receiptCanvas,
    recognitionBounds.left,
    recognitionBounds.top,
    recognitionBounds.width,
    recognitionBounds.height,
    0,
    0,
    recognitionBounds.width,
    recognitionBounds.height,
  );
  preprocessCanvas(canvas);

  return canvas;
}

function normaliseOcrAmount(amount: string): string | undefined {
  const match = amount.match(/(\d+)\s*[,.]\s*(\d{1,3})/u);
  if (!match) {
    return undefined;
  }

  const euros = Number.parseInt(match[1], 10);
  const cents = match[2].slice(0, 2).padEnd(2, '0');

  if (!Number.isFinite(euros) || euros > 999) {
    return undefined;
  }

  return `${euros}.${cents}`;
}

function amountValue(amount: string): number {
  return Number.parseFloat(amount);
}

function shouldReplaceAmount(previousAmount: string, nextAmount: string): boolean {
  const previous = amountValue(previousAmount);
  const next = amountValue(nextAmount);

  if (next <= previous) {
    return false;
  }

  const ratio = next / previous;
  return ratio >= 1.45 && ratio <= 4.2;
}

function getLineAmounts(line: string): string[] {
  if (/\/?\s*kg|€\s*\/\s*kg/iu.test(line)) {
    return [];
  }

  return [...line.matchAll(/\d+\s*[,.]\s*\d{1,3}/gu)]
    .map((match) => normaliseOcrAmount(match[0]))
    .filter((amount): amount is string => amount !== undefined);
}

function cleanItemName(line: string): string {
  const cleaned = line
    .replaceAll(/[|_[\]{}]/g, ' ')
    .replaceAll(/[$£€]/g, ' ')
    .replaceAll(/\bkr\b/giu, ' ')
    .replaceAll(/\b\d+\s*[,.]\s*\d{1,3}\b/gu, ' ')
    .replaceAll(/[-–—]{2,}/gu, ' ')
    .replaceAll(/\s+/g, ' ')
    .replace(/^\d+\s*x\s+/iu, '')
    .replace(/^\d+\s+/u, '')
    .replace(/^x\s+/iu, '')
    .replace(/^[-–—~]+\s*/u, '')
    .trim();

  return normaliseItemName(cleaned);
}

function isNoisyItemName(name: string): boolean {
  const words = name.split(/\s+/u).filter(Boolean);
  if (/[;<>~]/u.test(name)) {
    return true;
  }
  if (name === name.toLowerCase() && name.length < 10) {
    return true;
  }
  if (words.length < 4) {
    return false;
  }

  const shortWords = words.filter((word) => word.length <= 2).length;
  return shortWords / words.length > 0.65;
}

function normaliseItemName(name: string): string {
  return name;
}

function isHeaderLine(line: string): boolean {
  return /descr|concepto|unit|valor|produtos|dep[oó]sitos|taxa|iva|vat|cart|bacar|pagamento|terminal|receipt|table|tab name|print|printed|sat|sun|mon|tue|wed|thu|fri|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|cvr|nif|order|ordred|products|precio|importe|factura|ificada|subtotal|sales|tax|cuota|bruto|base imponible|por comensal|servicios|atendi/iu.test(
    line,
  );
}

function isSummaryLine(line: string): boolean {
  return /^(?:total|sales total|subtotal|net sales|total tax|to pay|cuenta|conta|cuota|bruto|base imponible|iva|vat|media|commercial|por comensal)\b/iu.test(
    line.trim(),
  );
}

function isLikelyItemLine(line: string): boolean {
  const cleaned = cleanItemName(line);

  return (
    cleaned.length >= 3 &&
    /\p{L}{2}/iu.test(cleaned) &&
    !isHeaderLine(cleaned) &&
    !isNoisyItemName(cleaned)
  );
}

function getLineTotalAmount(amounts: string[]): string | undefined {
  return amounts.at(-1);
}

function isBetterItemName(name: string): boolean {
  return name === name.toUpperCase() && !isNoisyItemName(name) && !isHeaderLine(name);
}

function tidyReceiptRows(
  rows: { amount: string; name: string }[],
): { amount: string; name: string }[] {
  const tidyRows: { amount: string; name: string }[] = [];

  for (const row of rows) {
    if (amountValue(row.amount) === 0) {
      const previousRow = tidyRows.at(-1);
      if (previousRow && !isBetterItemName(previousRow.name) && isBetterItemName(row.name)) {
        previousRow.name = row.name;
      }
      continue;
    }

    tidyRows.push(row);
  }

  return tidyRows;
}

function normaliseReceiptOcrText(text: string): string {
  const currencySymbol = getDetectedCurrencySymbol(text);
  const lines = text
    .split(/\n+/u)
    .map((line) => line.trim())
    .filter(Boolean);

  const receiptRows: { amount: string; name: string }[] = [];
  let currentItem:
    { amount?: string; amountSource?: 'following' | 'line' | 'pending'; name: string } | undefined;
  let pendingAmount: string | undefined;
  let pendingAmountName: string | undefined;
  let shortItemNameCandidate: string | undefined;

  const flushCurrentItem = () => {
    if (currentItem?.amount) {
      receiptRows.push({ amount: currentItem.amount, name: currentItem.name });
    }
    currentItem = undefined;
  };

  for (const line of lines) {
    if (receiptRows.length > 0 && (/produtos/iu.test(line) || isSummaryLine(cleanItemName(line)))) {
      break;
    }

    if (/\/?\s*kg|€\s*\/\s*kg/iu.test(line)) {
      pendingAmountName = shortItemNameCandidate ?? 'Weighted item';
    }

    const amounts = getLineAmounts(line);
    const lineTotalAmount = getLineTotalAmount(amounts);
    const isItemLine = isLikelyItemLine(line);
    const cleanedLine = cleanItemName(line);

    if (isItemLine) {
      flushCurrentItem();
      currentItem = {
        amount: lineTotalAmount ?? pendingAmount,
        amountSource: lineTotalAmount ? 'line' : pendingAmount ? 'pending' : undefined,
        name: cleanedLine,
      };
      pendingAmount = undefined;
      pendingAmountName = undefined;
      shortItemNameCandidate = undefined;
    } else if (
      amounts.length === 0 &&
      /^[A-ZÀ-Ý]{2,4}$/u.test(cleanedLine) &&
      !isHeaderLine(cleanedLine)
    ) {
      shortItemNameCandidate = cleanedLine;
    }

    if (!isItemLine && lineTotalAmount) {
      if (
        receiptRows.length === 0 &&
        !currentItem &&
        !/[$£€]|\bkr\b/iu.test(line) &&
        isNoisyItemName(cleanedLine)
      ) {
        continue;
      }

      if (currentItem && !currentItem.amount) {
        currentItem.amount = lineTotalAmount;
        currentItem.amountSource = 'following';
      } else if (
        currentItem?.amount &&
        currentItem.amountSource !== 'pending' &&
        shouldReplaceAmount(currentItem.amount, lineTotalAmount)
      ) {
        currentItem.amount = lineTotalAmount;
      } else {
        pendingAmount = lineTotalAmount;
      }
    } else if (isItemLine && currentItem?.amount && amounts.length > 1) {
      for (const amount of amounts.slice(0, -1)) {
        if (shouldReplaceAmount(currentItem.amount, amount)) {
          currentItem.amount = amount;
        }
      }
    }
  }

  flushCurrentItem();

  if (
    pendingAmount &&
    (pendingAmountName || shortItemNameCandidate || amountValue(pendingAmount) < 50)
  ) {
    receiptRows.push({
      amount: pendingAmount,
      name: shortItemNameCandidate ?? pendingAmountName ?? 'Unrecognised item',
    });
  }

  const tidyRows = tidyReceiptRows(receiptRows);

  return tidyRows.length > 0
    ? tidyRows.map(({ amount, name }) => `${name} ${amount}${currencySymbol}`).join('\n')
    : text.trim();
}

function getDetectedCurrencySymbol(text: string): string {
  if (text.includes('€')) {
    return ' €';
  }
  if (text.includes('£')) {
    return ' £';
  }
  if (text.includes('$')) {
    return ' $';
  }
  if (/\bcvr\b/iu.test(text)) {
    return ' kr';
  }
  if (
    /\b(?:iva|cuota|base imponible|restaurante|factura simplificada|precio importe|cuenta)\b/iu.test(
      text,
    )
  ) {
    return ' €';
  }
  return '';
}

export async function recogniseReceiptImage(
  file: File,
  onProgress: (progress: OcrProgress) => void,
): Promise<string> {
  progressListener = onProgress;

  const canvas = await prepareReceiptImage(file);
  const worker = await getWorker(onProgress);
  const cachePromise = cacheOcrAssets();

  reportProgress('Recognising receipt text', 0);
  await setGeneralOcrParameters(worker);
  const {
    data: { text },
  } = await worker.recognize(canvas);
  await cachePromise;
  return normaliseReceiptOcrText(text);
}
