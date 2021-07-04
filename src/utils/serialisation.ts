import { FormikFormState, MinifiedFormikState, ReceiptItemWithShare } from 'types';
import pako from 'pako';
import { base64ToBytes, bytesToBase64 } from 'byte-base64';

export const minify = ({ numberOfPeople, receiptItems }: FormikFormState): MinifiedFormikState => {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const r = receiptItems.map(({ discount: d, shares: s, item: i, price: p }) => ({
    d,
    s,
    i,
    p,
  }));

  return { n: numberOfPeople, r };
};

export const deminify = ({ n: numberOfPeople, r }: MinifiedFormikState): FormikFormState => {
  const receiptItems: ReceiptItemWithShare[] = r.map(({ d, s, i, p }) => ({
    discount: d,
    shares: s,
    item: i,
    price: p,
  }));

  const state = { numberOfPeople, receiptItems };
  const receipt = state.receiptItems.map(({ item, price }) => `${item} £${price}`).join('\n');
  return { ...state, receipt: `${receipt}\n` };
};

export const compressEncode = (object: any): string => {
  const compressed = pako.gzip(JSON.stringify(object));
  const base64 = bytesToBase64(compressed);
  return base64.replace(/\//g, '-');
};

export const decompressDecode = (base64: string): MinifiedFormikState => {
  const replacedBase64 = base64.replace(/-/g, '/');
  const compressed = base64ToBytes(replacedBase64);
  const decompressed = pako.ungzip(compressed);

  const decompressedString = new TextDecoder().decode(decompressed);

  return JSON.parse(decompressedString) as MinifiedFormikState;
};
