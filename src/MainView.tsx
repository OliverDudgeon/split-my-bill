import React, { ChangeEvent, FC } from 'react';

import { FieldInputProps, Form, Formik } from 'formik';

import pako from 'pako';
import { NumberOfPeopleInput } from './components/NumberOfPeopleInput';
import { ReceiptTextArea } from './components/ReceiptTextArea';
import { GridView } from './GridView';
import { divideReceipt, resizeArrayRight } from './utils/utils';

import type {
  FormikFormState,
  FormikSetter,
  ReceiptItemWithShare,
  NumericInputValue,
  MinifiedFormikState,
} from './types';
import { decompressDecode, deminify } from './utils/serialisation';

const testReceipt = `Root Ginger Loose £1.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags £1.50
Pesto & Goat Cheese Tortelloni 300g £1.50
`;

const initNumberOfPeople = 3;
const initialValues: FormikFormState = {
  receipt: testReceipt,
  numberOfPeople: initNumberOfPeople,
  receiptItems: divideReceipt(testReceipt).map((receiptItem) => ({
    ...receiptItem,
    shares: Array.from({ length: initNumberOfPeople }).fill('') as NumericInputValue[],
    discount: '',
  })),
};

/**
 * Adjust the entries for each receipt item to match the latest textfield input
 */
const handleReceiptChange =
  (values: FormikFormState, setValues: FormikSetter<FormikFormState>) =>
  (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => {
    const receipt = divideReceipt(event.target.value);
    const previousReceipt = values.receiptItems;

    const { numberOfPeople } = values;

    const newItemsState: ReceiptItemWithShare[] = receipt.map((receiptItem, itemIndex) => {
      const previousItemAtItemIndex = previousReceipt[itemIndex];

      if (previousItemAtItemIndex) {
        return {
          ...receiptItem,
          discount: previousItemAtItemIndex.discount,
          shares: previousItemAtItemIndex.shares,
        };
      }
      return {
        ...receiptItem,
        discount: '',
        shares: Array.from({ length: numberOfPeople }).fill('') as NumericInputValue[],
      };
    });

    setValues({ ...values, receiptItems: newItemsState });
    field.onChange(event);
  };

/**
 * Adjust the form state to have the number of "shares" fields specified from the "number of people" input
 */
const handleChangeToNumberOfPeople =
  (values: FormikFormState, setValues: FormikSetter<FormikFormState>) =>
  (event: ChangeEvent<HTMLInputElement>, field: FieldInputProps<string>) => {
    const newNumberOfPeople = Number.parseInt(event.target.value, 10);

    const newReceiptItems = values.receiptItems.map((receiptItem) => ({
      ...receiptItem,
      shares: resizeArrayRight(receiptItem.shares, newNumberOfPeople, ''),
    }));

    setValues({ ...values, receiptItems: newReceiptItems });
    field.onChange(event);
  };

export const MainView: FC = () => {
  let parsedFormikState: FormikFormState | undefined;
  try {
    const paths = window.location.pathname;

    // Extract the part of the url after the base path
    const urlValues = decompressDecode(paths.split('/')[2]);

    parsedFormikState = deminify(urlValues);
  } catch (error) {
    console.error(error);
    parsedFormikState = undefined;
  }

  return (
    <main className="py-4">
      <Formik initialValues={parsedFormikState ?? initialValues} onSubmit={() => {}}>
        {({ values, setValues }) => (
          <Form>
            <ReceiptTextArea
              name="receipt"
              onValueChange={handleReceiptChange(values, setValues)}
            />
            <NumberOfPeopleInput
              label="Number of People"
              name="numberOfPeople"
              onValueChange={handleChangeToNumberOfPeople(values, setValues)}
            />
            {values.receiptItems.length > 0 && <GridView values={values} />}
          </Form>
        )}
      </Formik>
    </main>
  );
};
