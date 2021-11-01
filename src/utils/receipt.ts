import { ITEM_REGEX } from '../regexp';
import type { FormikFormState, ReceiptItem } from '../types';
import { calculateDiscount } from './money';
import { sum } from './utils';

type Match = [string, string, string, string, string, string];

export function divideReceipt(source: string): ReceiptItem[] {
  const receiptItems: ReceiptItem[] = [];
  for (const line of source.split('\n')) {
    const match = line.match(ITEM_REGEX) as Match | null;

    const [_, item, negative, _prefixCurrency, price, _suffixCurrency] = match ?? [];

    if (item !== undefined && price !== undefined) {
      receiptItems.push({
        item,
        price: Number.parseFloat(price) * (negative ? -1 : 1),
      });
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
