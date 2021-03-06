import type { ReactElement } from 'react';

import type { ReceiptItem } from '../../types';
import { calculatePercentDiscountFraction, calculateTotal } from '../../utils/money';
import { ColonTotal } from './ColonTotal';

interface ReceiptTotalProperties {
  receiptItems: ReceiptItem[];
  percentDiscount?: string;
}

export function ReceiptTotal({
  receiptItems,
  percentDiscount = '',
}: ReceiptTotalProperties): ReactElement {
  const percentDiscountFraction = calculatePercentDiscountFraction(percentDiscount);
  const total = calculateTotal(receiptItems);
  return (
    <ColonTotal
      label="Total"
      price={total}
      subLabel="sc"
      subPrice={percentDiscount ? total * percentDiscountFraction : undefined}
    />
  );
}
