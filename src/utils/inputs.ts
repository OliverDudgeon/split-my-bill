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
