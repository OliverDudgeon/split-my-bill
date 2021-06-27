import type { SetStateAction } from 'react';

export interface ReceiptItem {
  item: string;
  price: number;
}

type NumericInputValue = number | '';

export interface ReceiptItemWithShare extends ReceiptItem {
  discount: NumericInputValue;
  shares: NumericInputValue[];
}

export interface FormikFormState {
  receipt: string;
  numberOfPeople: number;
  receiptItems: ReceiptItemWithShare[];
}

export type FormikSetter<TValue> = (
  values: SetStateAction<TValue>,
  shouldValidate?: boolean,
) => void;
