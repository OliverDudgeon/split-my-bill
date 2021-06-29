import { FormikFormState, MinifiedFormikState, ReceiptItemWithShare } from 'types';

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
