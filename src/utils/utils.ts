/**
 * Generates a array of numbers starting from zero up to n - 1
 * @param n Positive integer corresponding to the length of the returned array
 * @returns Array of integers increasing to n
 */
export const range = (n: number): number[] => [...Array.from({ length: n }).keys()];

// eslint-disable-next-line unicorn/no-array-reduce
export const sum = (array: number[]): number => array.reduce((a, b) => a + b, 0);

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
