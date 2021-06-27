import React, { ChangeEvent, FC } from 'react';

import { FieldInputProps, Form, Formik } from 'formik';

import { NumberOfPeopleInput } from './components/NumberOfPeopleInput';
import { ReceiptTextArea } from './components/ReceiptTextArea';
import { GridView } from './GridView';
import { divideReceipt } from './utils';

import type { FormikFormState, FormikSetter, ReceiptItemWithShare } from './types';
const testReceipt = `Root Ginger Loose £1.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags £1.50
Pesto & Goat Cheese Tortelloni 300g £1.50
`;

const initNumOfPeople = 3;
const initialValues: FormikFormState = {
  receipt: testReceipt,
  numberOfPeople: initNumOfPeople,
  receiptItems: divideReceipt(testReceipt).map((receiptItem) => ({
    ...receiptItem,
    shares: new Array(initNumOfPeople).fill(''),
    discount: '',
  })),
};

export const MainView: FC = () => {
  const handleReceiptChange =
    (values: FormikFormState, setValues: FormikSetter<FormikFormState>) =>
    (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => {
      const receipt = divideReceipt(event.target.value);
      const previousReceipt = values.receiptItems;

      const numberOfPeople = values.numberOfPeople;

      const newItemsState: ReceiptItemWithShare[] = receipt.map((receiptItem, itemIndex) => {
        const prevItemAtItemIndex = previousReceipt[itemIndex];

        if (prevItemAtItemIndex) {
          return {
            ...receiptItem,
            discount: prevItemAtItemIndex.discount,
            shares: prevItemAtItemIndex.shares,
          };
        } else {
          return { ...receiptItem, discount: '', shares: new Array(numberOfPeople).fill('') };
        }
      });

      setValues({ ...values, receiptItems: newItemsState });
      field.onChange(event);
    };

  const handleChangeToNumberOfPeople =
    (values: FormikFormState, setValues: FormikSetter<FormikFormState>) =>
    (event: ChangeEvent<HTMLInputElement>, field: FieldInputProps<string>) => {
      setValues({ ...values });
      field.onChange(event);
    };

  return (
    <main className="py-4">
      <Formik initialValues={initialValues} onSubmit={() => {}}>
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
            <GridView values={values} />
          </Form>
        )}
      </Formik>
    </main>
  );
};
