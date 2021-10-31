import type { ChangeEvent, ReactElement } from 'react';

import { ResetButton } from 'components/ResetButton';
import type { FieldInputProps } from 'formik';
import { Form, Formik } from 'formik';

import { NumberOfPeopleInput } from './components/NumberOfPeopleInput';
import { ReceiptTextArea } from './components/ReceiptTextArea';
import { ReceiptTotal } from './components/ReceiptTotal';
import { ServiceChargeInput } from './components/ServiceChargeInput';
import { ShareButton } from './components/ShareButton';
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
  serviceCharge: '0',
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
const onReceiptChange =
  (values: FormikFormState, setValues: FormikSetter<FormikFormState>) =>
  (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => {
    const receipt = divideReceipt(event.target.value);

    const { receiptItems: previousReceipt, numberOfPeople } = values;

    const newItemsState: ReceiptItemWithShare[] = receipt.map((receiptItem, itemIndex) => {
      const previousItemAtItemIndex =
        itemIndex <= previousReceipt.length - 1 ? previousReceipt[itemIndex] : undefined;

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

export function MainView(): ReactElement {
  let parsedFormikState: FormikFormState | undefined;
  try {
    const paths = window.location.search;

    // Remove the '?' at the start
    const urlValues = decompressDecode(paths.slice(1));

    parsedFormikState = urlValues !== undefined ? deminify(urlValues) : undefined;
  } catch (error) {
    console.error(error);
    parsedFormikState = undefined;
  }

  return (
    <main className="py-4">
      <Formik initialValues={parsedFormikState ?? initialValues} onSubmit={() => {}}>
        {({ values, setValues }) => (
          <Form>
            <ReceiptTextArea name="receipt" onValueChange={onReceiptChange(values, setValues)} />
            <ReceiptTotal receiptItems={values.receiptItems} />

            <ServiceChargeInput />
            <ResetButton onReset={() => setValues(initialValues)} />

            <ReceiptTotal receiptItems={values.receiptItems} serviceCharge={values.serviceCharge} />

            <NumberOfPeopleInput setValues={setValues} values={values} />

            <GridView values={values} />
          </Form>
        )}
      </Formik>
      <div>
        <p>Click the button to copy a shortened url to share with your splitees</p>
        <ShareButton />
      </div>
    </main>
  );
}
