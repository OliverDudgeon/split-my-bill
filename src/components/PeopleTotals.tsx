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
            className={personIndex === 0 ? 'col-start-1 sm:col-start-4' : ''}
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
