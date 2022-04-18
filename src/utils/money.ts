import type { ReceiptItem } from '../types';
import { range, sum } from './utils';

export const poundFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  currencyDisplay: 'narrowSymbol',
});

/**
 * Calculates a actual price from a price and a discount
 * @param discount the discount to be calculated: either a absolute price to be subtracted or a percentage
 * @param price the price the discount is taken from
 * @returns the calculated price
 */
export const calculateDiscount = (discount: string, price: number): number => {
  // discount is a string - it can be either a absolute number (1.50 meaning £1.50) or a percentage
  // (1.5% meaning a 0.95x multiplier)
  const parsedDiscount = Number.parseFloat(discount) || 0;
  if (discount.includes('%')) {
    return price * (1 - parsedDiscount / 100);
  }
  return price - parsedDiscount;
};

export const calculatePercentDiscountFraction = (percentDiscount: string): number =>
  (Number.parseFloat(percentDiscount) || 0) / 100;

export const calculateTotal = (receiptItems: ReceiptItem[]): number =>
  sum(receiptItems.map((item) => item.price));

export const sumPricesByPerson = (prices: number[][]): number[] => {
  if (prices.length === 0) {
    return [];
  }
  return range(prices[0].length).map((index) => sum(prices.map((item) => item[index])));
};
