/**
 * Generates a array of numbers starting from zero up to n - 1
 * @param n Positive integer corresponding to the length of the returned array
 * @returns Array of integers increasing to n
 */

export const range = (n: number) => [...Array(n).keys()];

export const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

export const sumPricesByPerson = (prices: number[][]) => {
  return range(prices[0].length).map((index) => sum(prices.map((item) => item[index])));
};

export const poundFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'GBP',
});
