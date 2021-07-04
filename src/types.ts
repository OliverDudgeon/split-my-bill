import type { SetStateAction } from 'react';

export interface ReceiptItem {
  item: string;
  price: number;
}

export type NumericInputValue = number | '';

export interface ReceiptItemWithShare extends ReceiptItem {
  discount: NumericInputValue;
  shares: NumericInputValue[];
}

export interface FormikFormState {
  receipt: string;
  numberOfPeople: number;
  peoplesInitials: string[];
  receiptItems: ReceiptItemWithShare[];
}

export interface MinifiedFormikState {
  n: number;
  r: {
    d: NumericInputValue;
    s: NumericInputValue[];
    i: string;
    p: number;
  }[];
  p: string[];
}

export type FormikSetter<TValue> = (
  values: SetStateAction<TValue>,
  shouldValidate?: boolean,
) => void;
