/**
 * Generates a array of numbers starting from zero up to n - 1
 * @param n Positive integer corresponding to the length of the returned array
 * @returns Array of integers increasing to n
 */

import { CURRENCY_SYMBOLS } from './constants';

import type { ReceiptItem } from './types';

export const range = (n: number) => [...Array(n).keys()];

export const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

export const sumPricesByPerson = (prices: number[][]) => {
  return range(prices[0].length).map((index) => sum(prices.map((item) => item[index])));
};

export const poundFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'GBP',
});

export const divideReceipt = (source: string): ReceiptItem[] => {
  const receiptItems: ReceiptItem[] = [];
  source.split('\n').map((line) => {
    for (const symbol of CURRENCY_SYMBOLS) {
      const [item, price] = line.split(symbol);

      price !== undefined && receiptItems.push({ item, price: parseFloat(price) });
    }
  });

  return receiptItems;
};

export const calculatePriceSummaryFromFormData = (
  formData: FormData,
  receiptItems: ReceiptItem[],
  numOfPeople: number,
) => {
  return receiptItems.map(({ price }, itemIndex) => {
    const discount = Number(formData.get(`discount-${itemIndex}`));
    const shares = range(numOfPeople).map((personIndex) =>
      Number(formData.get(`share-${itemIndex}-${personIndex}`)),
    );

    // discount is a FormDataEntryValue - assume a number has been inputted
    const actualPrice = price - discount;

    const totalShares = sum(shares);

    if (totalShares === 0) {
      return new Array(numOfPeople).fill(actualPrice / numOfPeople);
    } else {
      return shares.map((share) => (actualPrice * share) / totalShares);
    }
  });
};
