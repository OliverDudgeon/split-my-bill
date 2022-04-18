import type { ReactElement } from 'react';

import { ColonTotal } from './dataDisplay/ColonTotal';

export interface PeopleTotalsProperties {
  labels: string[];
  priceSummary: number[];
  total: number;
  percentDiscountFraction: number;
}

export function PeopleTotals({
  total,
  percentDiscountFraction,
  priceSummary,
  labels,
}: PeopleTotalsProperties): ReactElement {
  return (
    <>
      {priceSummary.map((price, personIndex) => {
        const percentDiscount = (total * percentDiscountFraction * price) / total;
        return (
          <ColonTotal
            className={personIndex === 0 ? 'col-start-1 sm:col-start-4' : ''}
            key={personIndex}
            label={labels[personIndex]}
            price={price + percentDiscount}
            subLabel="%dis"
            subPrice={percentDiscount}
          />
        );
      })}
    </>
  );
}
