import { MONEY_AMOUNT_REGEXP } from '../regexp';
import type { FormikFormState, ReceiptItem } from '../types';
import { calculateDiscount } from './money';
import { sum } from './utils';

export function divideReceipt(source: string): ReceiptItem[] {
  const receiptItems: ReceiptItem[] = [];

  let previousIndex = 0;
  for (const match of `${source}\n`.matchAll(MONEY_AMOUNT_REGEXP)) {
    if (match.index && !!match[0].match(/\d/)?.[0]) {
      const price = Number.parseFloat(
        match[0].trim().replaceAll("[,']", '.').replaceAll(/[$£€]/g, ''),
      );
      const item = source.slice(previousIndex, match.index).trim();
      previousIndex = match.index + match[0].length;
      receiptItems.push({ item, price });
    }
  }

  return receiptItems;
}

export function splitItems(values: FormikFormState): number[][] {
  // Divide the receipt
  return values.receiptItems.map(({ price, discount, shares }) => {
    const actualPrice = calculateDiscount(discount, price);

    const totalShares = sum(shares.map((share) => Number.parseInt(share, 10) || 0));

    if (totalShares === 0) {
      return Array.from({ length: values.numberOfPeople }).fill(
        actualPrice / values.numberOfPeople,
      ) as number[];
    }
    return shares.map((share) => (actualPrice * (Number.parseInt(share, 10) || 0)) / totalShares);
  });
}
