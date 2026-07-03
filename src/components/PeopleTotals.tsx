import type { ReactElement } from 'react';

import { percentageMultiplierText } from '../constants';
import { ColonTotal } from './dataDisplay/ColonTotal';

export interface PeopleTotalsProperties {
  labels: string[];
  priceSummary: number[];
  total: number;
  percentageMultiplierFraction: number;
}

export function PeopleTotals({
  total,
  percentageMultiplierFraction,
  priceSummary,
  labels,
}: PeopleTotalsProperties): ReactElement {
  return (
    <>
      {priceSummary.map((price, personIndex) => {
        const percentageMultiplierDifference =
          (total * percentageMultiplierFraction * price) / total;
        return (
          <ColonTotal
            className={`mt-2 rounded-2xl bg-teal-500 px-4 py-3 text-center font-black text-white shadow-lg shadow-teal-900/20 dark:bg-teal-300 dark:text-teal-950 ${
              personIndex === 0 ? 'col-start-4' : ''
            }`}
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
