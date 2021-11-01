import type { ChangeEvent, ReactElement } from 'react';

import type { FieldInputProps } from 'formik';

import { initialValues } from '../../constants';
import type {
  AppFormikProperties,
  FormikFormState,
  FormikSetter,
  ReceiptItemWithShare,
} from '../../types';
import { divideReceipt } from '../../utils/receipt';
import { ReceiptTotal } from '../dataDisplay/ReceiptTotal';
import { NumberOfPeopleInput } from '../inputs/NumberOfPeopleInput';
import { ReceiptTextArea } from '../inputs/ReceiptTextArea';
import { ResetButton } from '../inputs/ResetButton';
import { ServiceChargeInput } from '../inputs/ServiceChargeInput';

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

export function Receipt({ values, setValues }: AppFormikProperties): ReactElement {
  return (
    <>
      <ReceiptTextArea name="receipt" onValueChange={onReceiptChange(values, setValues)} />
      <ReceiptTotal receiptItems={values.receiptItems} />

      <ServiceChargeInput />
      <ResetButton onReset={() => setValues({ ...initialValues, receipt: '', receiptItems: [] })} />

      <ReceiptTotal receiptItems={values.receiptItems} serviceCharge={values.serviceCharge} />

      <NumberOfPeopleInput setValues={setValues} values={values} />
    </>
  );
}
