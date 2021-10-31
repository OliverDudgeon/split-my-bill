/**
 * Generates a array of numbers starting from zero up to n - 1
 * @param n Positive integer corresponding to the length of the returned array
 * @returns Array of integers increasing to n
 */

import { ITEM_REGEX } from '../constants';
import type { ReceiptItem } from '../types';

export const range = (n: number): number[] => [...Array.from({ length: n }).keys()];

// eslint-disable-next-line unicorn/no-array-reduce
export const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0);

export const sumPricesByPerson = (prices: number[][]): number[] =>
  range(prices[0].length).map((index) => sum(prices.map((item) => item[index])));

/**
 * Shrink or increase the length of an array
 * @param array the array to be changed
 * @param length the new length of the array
 * @param fillWith new values will be filled with this value
 * @returns A new array with a new length
 */
export const resizeArrayRight = <TArrayValue>(
  array: TArrayValue[],
  length: number,
  fillWith?: TArrayValue,
): TArrayValue[] =>
  [...array, ...(Array.from({ length }).fill(fillWith) as TArrayValue[])].slice(0, length);

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

export const calculateServiceChargeFraction = (serviceCharge: string): number =>
  (Number.parseFloat(serviceCharge) || 0) / 100;

export const calculateTotal = (receiptItems: ReceiptItem[]): number =>
  sum(receiptItems.map((item) => item.price));

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

type InitialsName = `peoplesInitials.${number}`;
type DiscountName = `receiptItems.${number}.discount`;
type ShareName = `receiptItems.${number}.shares.${number}`;

type InputName = DiscountName | InitialsName | ShareName;

export const getInitialsInputName = (personIndex: number): InitialsName =>
  `peoplesInitials.${personIndex}`;

export const getDiscountInputName = (itemIndex: number): DiscountName =>
  `receiptItems.${itemIndex}.discount`;

export const getShareInputName = (itemIndex: number, personIndex: number): ShareName =>
  `receiptItems.${itemIndex}.shares.${personIndex}`;

export const getInputName = (row: number, column: number): InputName => {
  if (column === 0) {
    return getDiscountInputName(row - 1);
  }
  if (row === 0) {
    return getInitialsInputName(column - 1);
  }

  return getShareInputName(row - 1, column - 1);
};
