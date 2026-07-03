import type { ReactElement } from 'react';

import {
  calculatePostDiscountTotal,
  detectCurrencyFormat,
  formatMoney,
  sumPricesByPerson,
} from '../../utils/money';
import { splitItems } from '../../utils/receipt';
import { sum } from '../../utils/utils';
import type { SharesProperties } from './Shares';

export function TotallingMessage({ values }: SharesProperties): ReactElement | null {
  const { receiptItems } = values;

  const sharesByPerson = sumPricesByPerson(splitItems(values));
  const totalAfterSplittingCents = sum(sharesByPerson.map((cost) => Math.round(cost * 100)));
  const itemsTotalCents = Math.round(calculatePostDiscountTotal(receiptItems) * 100);
  const differenceCents = itemsTotalCents - totalAfterSplittingCents;
  const currencyFormat = detectCurrencyFormat(values.receipt, values.receiptCurrency);

  // eslint-disable-next-line unicorn/no-null
  return differenceCents === 0 ? null : (
    <div className="mx-auto mt-5 max-w-4xl rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-950 shadow-lg shadow-amber-950/10">
      <b>
        The receipt was split with a difference of{' '}
        {formatMoney(differenceCents / 100, currencyFormat)}
      </b>
    </div>
  );
}
