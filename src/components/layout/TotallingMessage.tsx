import type { ReactElement } from 'react';

import { calculatePostDiscountTotal, poundFormatter, sumPricesByPerson } from '../../utils/money';
import { splitItems } from '../../utils/receipt';
import { sum } from '../../utils/utils';
import type { SharesProperties } from './Shares';

export function TotallingMessage({ values }: SharesProperties): ReactElement | null {
  const { receiptItems } = values;

  const sharesByPerson = sumPricesByPerson(splitItems(values));
  const totalAfterSplitting = sum(sharesByPerson.map((cost) => Number.parseFloat(cost.toFixed(2))));
  const itemsTotal = calculatePostDiscountTotal(receiptItems).toFixed(2);
  const difference = Number.parseFloat(itemsTotal) - totalAfterSplitting;

  const value = Math.ceil(Math.abs(difference) * 100) / 100;
  const sign = Math.sign(difference);

  // eslint-disable-next-line unicorn/no-null
  return difference === 0 ? null : (
    <div className="max-w-screen-sm mx-auto mb-2">
      <b>The receipt was split with a difference of {poundFormatter.format(sign * value)}</b>
    </div>
  );
}
