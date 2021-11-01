import type { ReactElement } from "react";

import { ColonTotal } from "./ColonTotal";

export interface PeopleTotalsProperties {
  labels: string[];
  priceSummary: number[];
  total: number;
  serviceChargeFraction: number;
}

// function doesFormatterRound(price: number): -1 | 0 | 1 {
//   const difference = price - Number.parseFloat(price.toFixed(2));
//   if (difference > 0) {
//     return -1;
//   }
//   if (difference < 0) {
//     return 1;
//   }
//   return 0;
// }

export function PeopleTotals({
  total,
  serviceChargeFraction,
  priceSummary,
  labels,
}: PeopleTotalsProperties): ReactElement {
  return (
    <>
      {priceSummary.map((price, personIndex) => {
        const serviceCharge = (total * serviceChargeFraction * price) / total;
        return (
          <ColonTotal
            className={personIndex === 0 ? "col-start-1 sm:col-start-4" : ""}
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
