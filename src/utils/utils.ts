/**
 * Generates a array of numbers starting from zero up to n - 1
 * @param n Positive integer corresponding to the length of the returned array
 * @returns Array of integers increasing to n
 */

import { CURRENCY_SYMBOLS } from '../constants';
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
export const resizeArrayRight = <TArrayValue extends unknown>(
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

export const divideReceipt = (source: string): ReceiptItem[] => {
  const receiptItems: ReceiptItem[] = [];
  for (const line of source.split('\n')) {
    for (const symbol of CURRENCY_SYMBOLS) {
      const [item, price] = line.split(symbol);
      if (price !== undefined) {
        receiptItems.push({ item, price: Number.parseFloat(price) });
      }
    }
  }

  return receiptItems;
};

type InitialsName = `peoplesInitials.${number}`;
type DiscountName = `receiptItems.${number}.discount`;
type ShareName = `receiptItems.${number}.shares.${number}`;

type InputName = InitialsName | DiscountName | ShareName;

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
