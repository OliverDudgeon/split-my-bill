import type { ReactElement } from 'react';

import type { ReceiptItem } from '../../types';
import { calculateServiceChargeFraction, calculateTotal } from '../../utils/money';
import { ColonTotal } from './ColonTotal';

interface ReceiptTotalProperties {
  receiptItems: ReceiptItem[];
  serviceCharge?: string;
}

export function ReceiptTotal({
  receiptItems,
  serviceCharge = '',
}: ReceiptTotalProperties): ReactElement {
  const serviceChargeFraction = calculateServiceChargeFraction(serviceCharge);
  const total = calculateTotal(receiptItems);
  return (
    <ColonTotal
      label="Total"
      price={total}
      subLabel="sc"
      subPrice={serviceCharge ? total * serviceChargeFraction : undefined}
    />
  );
}
