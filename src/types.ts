import type { SetStateAction } from 'react';

import type { FormikProps } from 'formik';

export interface ReceiptItem {
  item: string;
  price: number;
}

export interface ReceiptItemWithShare extends ReceiptItem {
  discount: string;
  shares: string[];
}

export interface FormikFormState {
  receipt: string;
  numberOfPeople: number;
  percentageMultiplier: string;
  peoplesInitials: string[];
  receiptItems: ReceiptItemWithShare[];
}

export type AppFormikProperties = FormikProps<FormikFormState>;

export interface MinifiedFormikState {
  n: number;
  sc: string;
  r: {
    d: string;
    s: string[];
    i: string;
    p: number;
  }[];
  p?: string[];
}

export type FormikSetter<TValue> = (
  values: SetStateAction<TValue>,
  shouldValidate?: boolean,
) => void;
