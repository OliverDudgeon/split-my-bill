import type { ReactElement } from 'react';

import type { ReceiptItem } from 'types';

import { calculateServiceChargeFraction, calculateTotal, poundFormatter } from '../utils/utils';

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
    <p>
      {`Total: ${poundFormatter.format(total * (serviceChargeFraction + 1))}`}
      {!!serviceCharge && ` sc: (${poundFormatter.format(total * serviceChargeFraction)})`}
    </p>
  );
}
