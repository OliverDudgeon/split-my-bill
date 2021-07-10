import React, { FC } from 'react';

import { ReceiptItem } from 'types';
import { poundFormatter, sum } from 'utils/utils';

interface ReceiptTotalProperties {
  receiptItems: ReceiptItem[];
}

export const ReceiptTotal: FC<ReceiptTotalProperties> = ({ receiptItems }) => (
  <p>{`Total: ${poundFormatter.format(sum(receiptItems.map((item) => item.price)))}`}</p>
);
