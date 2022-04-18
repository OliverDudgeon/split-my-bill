import { base64ToBytes, bytesToBase64 } from 'byte-base64';
import pako from 'pako';
import type { FormikFormState, MinifiedFormikState, ReceiptItemWithShare } from 'types';

export const minify = ({
  numberOfPeople,
  receiptItems,
  peoplesInitials,
  percentDiscount,
}: FormikFormState): MinifiedFormikState => {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const r = receiptItems.map(({ discount: d, shares: s, item: index, price: p }) => ({
    d,
    s,
    i: index,
    p,
  }));

  return { n: numberOfPeople, r, p: peoplesInitials, sc: percentDiscount };
};

export const deminify = ({
  n: numberOfPeople,
  r,
  p: peoplesInitials,
  sc: percentDiscount,
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
    percentDiscount,
    peoplesInitials:
      peoplesInitials ?? (Array.from({ length: numberOfPeople }).fill('') as string[]),
  };
  const receipt = state.receiptItems.map(({ item, price }) => `${item} £${price}`).join('\n');
  return { ...state, receipt: `${receipt}\n` };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const compressEncode = (object: unknown): string => {
  const compressed = pako.gzip(JSON.stringify(object));
  const base64 = bytesToBase64(compressed);
  return base64.replace(/\//g, '-');
};

export const decompressDecode = (base64: string): MinifiedFormikState | undefined => {
  const replacedBase64 = base64.replaceAll('-', '/');
  const compressed = base64ToBytes(replacedBase64);
  const decompressed = pako.ungzip(compressed);

  const decompressedString = new TextDecoder().decode(decompressed);

  if (!decompressedString) {
    return undefined;
  }

  return JSON.parse(decompressedString) as MinifiedFormikState;
};
