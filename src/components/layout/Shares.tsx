import type { ReactElement } from 'react';

import { useFocusInput } from '../../hooks/useFocusInput';
import { useGridTemplateColumns } from '../../hooks/useGridTemplateColumns';
import { useTrackFocus } from '../../hooks/useTrackFocus';
import { useUpdateUrl } from '../../hooks/useUpdateUrl';
import type { FormikFormState } from '../../types';
import {
  calculatePercentDiscountFraction,
  calculatePostDiscountTotal,
  poundFormatter,
  sumPricesByPerson,
} from '../../utils/money';
import { splitItems } from '../../utils/receipt';
import { InitialsInputsArray } from '../InitialsInputsArray';
import { MainTableArray } from '../MainTableArray';
import { PeopleTotals } from '../PeopleTotals';

export interface SharesProperties {
  values: FormikFormState;
}

export function Shares({ values }: SharesProperties): ReactElement {
  const { receiptItems, numberOfPeople, peoplesInitials, percentageMultiplier } = values;

  // Handle keyboard navigation
  const [focus, setFocus] = useTrackFocus(
    receiptItems.length * (numberOfPeople + 1) + numberOfPeople,
    numberOfPeople + 1,
  );
  useFocusInput(focus, numberOfPeople);

  useUpdateUrl(values);

  const sharesByPerson = sumPricesByPerson(splitItems(values));

  return (
    <section className="mx-0 w-full rounded-[2rem] border border-slate-200 bg-white/75 p-4 shadow-2xl shadow-slate-950/10 ring-1 ring-slate-950/5 backdrop-blur dark:border-white/15 dark:bg-slate-950/80 dark:shadow-slate-950/40 dark:ring-white/10 sm:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-teal-700 dark:text-teal-300">
            Share ledger
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Who had what?
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          Add share counts for custom splits. If a row is left blank, that item is split equally.
        </p>
      </div>

      <div className="overflow-x-auto border-y border-slate-300 bg-linear-to-b from-white/80 to-slate-100/80 px-2 py-5 dark:border-slate-700 dark:from-slate-900/40 dark:to-slate-900/80 sm:px-4">
        <div className="grid gap-3 text-sm" style={useGridTemplateColumns(numberOfPeople)}>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Item
          </span>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Price
          </span>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Discount
          </span>
          <InitialsInputsArray
            peoplesInitials={peoplesInitials}
            onClick={(inputIndex) => setFocus(inputIndex)}
          />

          {receiptItems.length > 0 ? (
            <MainTableArray
              focus={focus}
              numberOfPeople={numberOfPeople}
              peoplesInitials={peoplesInitials}
              receiptItems={receiptItems}
              onClick={(inputIndex) => setFocus(inputIndex)}
            />
          ) : (
            <p className="col-span-full rounded-2xl bg-slate-100 px-4 py-8 text-center font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              You have no receipt items to display.
            </p>
          )}

          <b className="col-start-1 mt-2 self-center rounded-2xl bg-slate-950 px-4 py-3 text-white dark:bg-white dark:text-slate-950">
            Total
          </b>

          <b className="col-start-2 mt-2 self-center rounded-2xl bg-teal-100 px-4 py-3 text-teal-950 dark:bg-teal-300 dark:text-teal-950">
            {poundFormatter.format(calculatePostDiscountTotal(receiptItems))}
          </b>

          <PeopleTotals
            labels={peoplesInitials}
            percentageMultiplierFraction={calculatePercentDiscountFraction(percentageMultiplier)}
            priceSummary={sharesByPerson}
          />
        </div>
      </div>
    </section>
  );
}
