import { base64ToBytes, bytesToBase64 } from 'byte-base64';
import { gzip, ungzip } from 'pako';
import type {
  FormikFormState,
  MinifiedFormikState,
  ReceiptCurrency,
  ReceiptItemWithShare,
} from 'types';

import { detectReceiptCurrency } from './money';

function minifyReceiptCurrency(receiptCurrency: ReceiptCurrency) {
  return {
    p: receiptCurrency.symbolPosition,
    s: receiptCurrency.symbol,
    w: receiptCurrency.symbolSpacing || undefined,
  };
}

export const minify = ({
  numberOfPeople,
  receiptItems,
  peoplesInitials,
  percentageMultiplier,
  receiptCurrency,
}: FormikFormState): MinifiedFormikState => {
  const r = receiptItems.map(({ discount: d, shares: s, item: index, price: p }) => ({
    d,
    s,
    i: index,
    p,
  }));

  return {
    c: receiptCurrency ? minifyReceiptCurrency(receiptCurrency) : false,
    n: numberOfPeople,
    r,
    p: peoplesInitials,
    sc: percentageMultiplier,
  };
};

export const deminify = ({
  n: numberOfPeople,
  r,
  p: peoplesInitials,
  sc: percentageMultiplier,
  c: currency,
}: MinifiedFormikState): FormikFormState => {
  const receiptItems: ReceiptItemWithShare[] = r.map(({ d, s, i, p }) => ({
    discount: d,
    shares: s,
    item: i,
    price: p,
  }));

  const state = {
    numberOfPeople,
    receiptItems,
    percentageMultiplier,
    peoplesInitials:
      peoplesInitials ?? (Array.from({ length: numberOfPeople }).fill('') as string[]),
  };
  const itemTextCurrency = detectReceiptCurrency(
    state.receiptItems.map(({ item }) => item).join('\n'),
  );
  const receiptCurrency =
    currency === false
      ? false
      : currency === undefined
        ? { symbol: '£', symbolPosition: 'prefix' as const, symbolSpacing: false }
        : (itemTextCurrency ?? {
            symbol: currency.s,
            symbolPosition: currency.p,
            symbolSpacing: currency.w ?? false,
          });
  const receipt = state.receiptItems
    .map(({ item, price }) => {
      if (receiptCurrency === false) {
        return `${item} ${price}`;
      }

      const spacing = receiptCurrency.symbolSpacing ? ' ' : '';
      return receiptCurrency.symbolPosition === 'prefix'
        ? `${item} ${receiptCurrency.symbol}${spacing}${price}`
        : `${item} ${price}${spacing}${receiptCurrency.symbol}`;
    })
    .join('\n');
  return { ...state, receipt: `${receipt}\n`, receiptCurrency };
};

export const compressEncode = (object: unknown): string => {
  const compressed = gzip(JSON.stringify(object));
  const base64 = bytesToBase64(compressed);
  return base64.replaceAll('/', '-');
};

export const decompressDecode = (base64: string): MinifiedFormikState | undefined => {
  const replacedBase64 = base64.replaceAll('-', '/');
  const compressed = base64ToBytes(replacedBase64);
  const decompressed = ungzip(compressed);

  const decompressedString = new TextDecoder().decode(decompressed);

  if (!decompressedString) {
    return undefined;
  }

  return JSON.parse(decompressedString) as MinifiedFormikState;
};
