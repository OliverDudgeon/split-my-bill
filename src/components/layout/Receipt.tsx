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
    <div className="space-y-5">
      <ReceiptTextArea name="receipt" onValueChange={onReceiptChange(values, setValues)} />

      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/70">
        <b className="text-lg text-slate-950 dark:text-white">
          <ReceiptTotal receiptItems={values.receiptItems} />
        </b>
      </div>

      <div className="grid gap-4 rounded-3xl border border-dashed border-teal-300 bg-teal-50/80 p-4 dark:border-teal-400/50 dark:bg-teal-950/30 sm:grid-cols-2 sm:items-end">
        <PercentDiscountInput />
        <div className="flex min-h-12 items-center justify-end rounded-2xl bg-white px-4 py-3 text-right font-bold text-slate-950 shadow-sm dark:bg-slate-950/80 dark:text-white">
          <ReceiptTotal
            percentDiscount={values.percentageMultiplier}
            receiptItems={values.receiptItems}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <NumberOfPeopleInput setValues={setValues} values={values} />
        <ResetButton
          onReset={() => setValues({ ...initialValues, receipt: '', receiptItems: [] })}
        />
      </div>
    </div>
  );
}
