import type { ReactElement } from 'react';

import { percentageMultiplierText } from '../constants';
import type { CurrencyFormat } from '../utils/money';
import { ColonTotal } from './dataDisplay/ColonTotal';

export interface PeopleTotalsProperties {
  labels: string[];
  priceSummary: number[];
  percentageMultiplierFraction: number;
  currencyFormat: CurrencyFormat;
}

export function PeopleTotals({
  percentageMultiplierFraction,
  priceSummary,
  labels,
  currencyFormat,
}: PeopleTotalsProperties): ReactElement {
  return (
    <>
      {priceSummary.map((price, personIndex) => {
        const percentageMultiplierDifference = price * percentageMultiplierFraction;
        return (
          <ColonTotal
            className={`mt-2 rounded-2xl bg-teal-500 px-4 py-3 text-center font-black text-white shadow-lg shadow-teal-900/20 dark:bg-teal-300 dark:text-teal-950 ${
              personIndex === 0 ? 'col-start-1 sm:col-start-4' : ''
            }`}
            currencyFormat={currencyFormat}
            key={personIndex}
            label={labels[personIndex]}
            price={price + percentageMultiplierDifference}
            subLabel={`${percentageMultiplierText} added`}
            subPrice={percentageMultiplierDifference}
          />
        );
      })}
    </>
  );
}
