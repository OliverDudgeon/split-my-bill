import type { ChangeEvent, ReactElement } from 'react';
import { useRef, useState } from 'react';

import type { FieldInputProps } from 'formik';

import { initialValues } from '../../constants';
import type {
  AppFormikProperties,
  FormikFormState,
  FormikSetter,
  ReceiptItemWithShare,
} from '../../types';
import { detectCurrencyFormat, detectReceiptCurrency } from '../../utils/money';
import type { OcrProgress } from '../../utils/ocr';
import { recogniseReceiptImage } from '../../utils/ocr';
import { divideReceipt } from '../../utils/receipt';
import { ReceiptTotal } from '../dataDisplay/ReceiptTotal';
import { NumberOfPeopleInput } from '../inputs/NumberOfPeopleInput';
import { PercentDiscountInput } from '../inputs/PercentDiscountInput';
import { ReceiptTextArea } from '../inputs/ReceiptTextArea';
import { ResetButton } from '../inputs/ResetButton';

/**
 * Adjust the entries for each receipt item to match the latest textfield input
 */
function getValuesForReceiptText(receiptText: string, values: FormikFormState): FormikFormState {
  const receipt = divideReceipt(receiptText);

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

  return {
    ...values,
    receipt: receiptText,
    receiptCurrency: detectReceiptCurrency(receiptText) ?? false,
    receiptItems: newItemsState,
  };
}

const onReceiptChange =
  (values: FormikFormState, setValues: FormikSetter<FormikFormState>) =>
  (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => {
    setValues(getValuesForReceiptText(event.target.value, values));
    field.onChange(event);
  };

export function Receipt({ values, setValues }: AppFormikProperties): ReactElement {
  const fileInputReference = useRef<HTMLInputElement>(null);
  const [isRecognisingReceipt, setIsRecognisingReceipt] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<OcrProgress>();
  const [ocrError, setOcrError] = useState<string>();
  const currencyFormat = detectCurrencyFormat(values.receipt, values.receiptCurrency);

  const onReceiptImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsRecognisingReceipt(true);
    setOcrError(undefined);
    setOcrProgress({ status: 'Preparing receipt image', progress: 0 });

    try {
      const receiptText = await recogniseReceiptImage(file, setOcrProgress);

      if (!receiptText.trim()) {
        throw new Error('No receipt text was found in that image.');
      }

      void setValues((currentValues) => getValuesForReceiptText(receiptText, currentValues));
      setOcrProgress({ status: 'Receipt text loaded', progress: 1 });
    } catch (error) {
      setOcrError(error instanceof Error ? error.message : 'Could not scan that receipt.');
    } finally {
      setIsRecognisingReceipt(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-3xl border border-dashed border-orange-300 bg-orange-50/80 p-4 dark:border-orange-300/40 dark:bg-orange-950/30">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-700 dark:text-orange-300">
              Scan receipt (alpha)
            </p>
            <p className="mt-2 text-sm leading-6 text-orange-950/80 dark:text-orange-100/80">
              Alpha feature: take a photo or upload an image. OCR runs in your browser and replaces
              the receipt text below, but you should expect to review and edit the result.
            </p>
          </div>
          <input
            accept="image/*"
            capture="environment"
            className="sr-only"
            ref={fileInputReference}
            type="file"
            onChange={onReceiptImageChange}
          />
          <button
            className="rounded-2xl bg-orange-500 px-5 py-3 font-black text-white shadow-lg shadow-orange-900/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300 disabled:text-orange-900 dark:bg-orange-300 dark:text-orange-950 dark:hover:bg-orange-200 dark:disabled:bg-orange-800 dark:disabled:text-orange-200"
            disabled={isRecognisingReceipt}
            type="button"
            onClick={() => fileInputReference.current?.click()}
          >
            {isRecognisingReceipt ? 'Scanning...' : 'Scan or upload'}
          </button>
        </div>
        {ocrProgress && (
          <div aria-live="polite" className="mt-4">
            <div className="flex items-center justify-between gap-4 text-sm font-semibold text-orange-950 dark:text-orange-100">
              <span>{ocrProgress.status}</span>
              {ocrProgress.progress !== undefined && (
                <span>{Math.round(ocrProgress.progress * 100)}%</span>
              )}
            </div>
            {ocrProgress.progress !== undefined && (
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-orange-200 dark:bg-orange-950">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all dark:bg-orange-300"
                  style={{ width: `${Math.round(ocrProgress.progress * 100)}%` }}
                />
              </div>
            )}
          </div>
        )}
        {ocrError && (
          <p className="mt-4 rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-900 dark:bg-red-950 dark:text-red-100">
            {ocrError}
          </p>
        )}
      </div>

      <ReceiptTextArea name="receipt" onValueChange={onReceiptChange(values, setValues)} />

      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-950/70">
        <b className="text-lg text-slate-950 dark:text-white">
          <ReceiptTotal currencyFormat={currencyFormat} receiptItems={values.receiptItems} />
        </b>
      </div>

      <div className="grid gap-4 rounded-3xl border border-dashed border-teal-300 bg-teal-50/80 p-4 dark:border-teal-400/50 dark:bg-teal-950/30 sm:grid-cols-2 sm:items-end">
        <PercentDiscountInput />
        <div className="flex min-h-12 items-center justify-end rounded-2xl bg-white px-4 py-3 text-right font-bold text-slate-950 shadow-sm dark:bg-slate-950/80 dark:text-white">
          <ReceiptTotal
            currencyFormat={currencyFormat}
            percentDiscount={values.percentageMultiplier}
            receiptItems={values.receiptItems}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <NumberOfPeopleInput setValues={setValues} values={values} />
        <ResetButton
          onReset={() =>
            setValues({ ...initialValues, receipt: '', receiptCurrency: false, receiptItems: [] })
          }
        />
      </div>
    </div>
  );
}
