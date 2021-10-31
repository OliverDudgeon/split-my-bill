import type { ReactElement } from 'react';

import { ColonTotal } from './ColonTotal';

export interface PeopleTotalsProperties {
  labels: string[];
  priceSummary: number[];
  total: number;
  serviceChargeFraction: number;
}

export function PeopleTotals({
  total,
  serviceChargeFraction,
  priceSummary,
  labels,
}: PeopleTotalsProperties): ReactElement {
  const serviceChargePerPerson = priceSummary.map(
    (price) => (total * serviceChargeFraction * price) / total,
  );

  return (
    <>
      {priceSummary.map((price, personIndex) => {
        const serviceCharge = serviceChargePerPerson[personIndex];
        return (
          <ColonTotal
            className={personIndex === 0 ? 'col-start-1 sm:col-start-4' : ''}
            key={personIndex}
            label={labels[personIndex]}
            price={price + serviceCharge}
            subLabel="sc"
            subPrice={serviceCharge}
          />
        );
      })}
    </>
  );
}
