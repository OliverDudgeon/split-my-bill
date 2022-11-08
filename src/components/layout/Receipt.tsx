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
import { PercentDiscountInput } from '../inputs/PercentDiscountInput';
import { ReceiptTextArea } from '../inputs/ReceiptTextArea';
import { ResetButton } from '../inputs/ResetButton';

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

      <div>
        <b>
          <ReceiptTotal receiptItems={values.receiptItems} />
        </b>
      </div>

      <div className="flex justify-between my-3">
        <PercentDiscountInput />
        <ReceiptTotal
          percentDiscount={values.percentageMultiplier}
          receiptItems={values.receiptItems}
        />
      </div>

      <div className="flex justify-between my-3">
        <NumberOfPeopleInput setValues={setValues} values={values} />
        <ResetButton
          onReset={() => setValues({ ...initialValues, receipt: '', receiptItems: [] })}
        />
      </div>
    </>
  );
}
