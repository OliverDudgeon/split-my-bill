import React, { ChangeEvent, FC } from 'react';

import { ShareButton } from 'components/ShareButton';
import { FieldInputProps, Form, Formik } from 'formik';

import { NumberOfPeopleInput } from './components/NumberOfPeopleInput';
import { ReceiptTextArea } from './components/ReceiptTextArea';
import { ReceiptTotal } from './components/ReceiptTotal';
import { decompressDecode, deminify } from './utils/serialisation';
import { divideReceipt } from './utils/utils';
import { GridView } from './GridView';
import type { FormikFormState, FormikSetter, ReceiptItemWithShare } from './types';

const testReceipt = `Root Ginger Loose £1.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags £1.50
Pesto & Goat Cheese Tortelloni 300g £1.50
`;

const initNumberOfPeople = 3;
const initialValues: FormikFormState = {
  receipt: testReceipt,
  numberOfPeople: initNumberOfPeople,
  peoplesInitials: Array.from({ length: initNumberOfPeople }).fill('') as string[],
  receiptItems: divideReceipt(testReceipt).map((receiptItem) => ({
    ...receiptItem,
    shares: Array.from({ length: initNumberOfPeople }).fill('') as string[],
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
        shares: Array.from({ length: numberOfPeople }).fill('') as string[],
      };
    });

    setValues({ ...values, receiptItems: newItemsState });
    field.onChange(event);
  };

export const MainView: FC = () => {
  let parsedFormikState: FormikFormState | undefined;
  try {
    const paths = window.location.search;

    // Remove the '?' at the start
    const urlValues = decompressDecode(paths.slice(1));

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
            <ReceiptTotal receiptItems={values.receiptItems} />

            <NumberOfPeopleInput setValues={setValues} values={values} />

            {values.receiptItems.length > 0 && <GridView values={values} />}
          </Form>
        )}
      </Formik>
      <div>
        <p>Click the button to copy a shortened url to share with your splitees</p>
        <ShareButton />
      </div>
    </main>
  );
};
