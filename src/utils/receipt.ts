import { ITEM_REGEX } from '../constants';
import type { ReceiptItem } from '../types';

type Match = [string, string, string, string, string, string];

export const divideReceipt = (source: string): ReceiptItem[] => {
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
};
