import type { ReactElement } from 'react';

import { percentageMultiplierText } from '../../constants';
import type { ReceiptItem } from '../../types';
import type { CurrencyFormat } from '../../utils/money';
import { calculatePercentDiscountFraction, calculateTotal } from '../../utils/money';
import { ColonTotal } from './ColonTotal';

interface ReceiptTotalProperties {
  receiptItems: ReceiptItem[];
  percentDiscount?: string;
  currencyFormat: CurrencyFormat;
}

export function ReceiptTotal({
  receiptItems,
  percentDiscount = '',
  currencyFormat,
}: ReceiptTotalProperties): ReactElement {
  const percentDiscountFraction = calculatePercentDiscountFraction(percentDiscount);
  const total = calculateTotal(receiptItems);
  return (
    <ColonTotal
      currencyFormat={currencyFormat}
      label="Total"
      price={total * (1 + percentDiscountFraction)}
      subLabel={`Inc. ${percentageMultiplierText}`}
      subPrice={percentDiscount ? total * percentDiscountFraction : undefined}
    />
  );
}
