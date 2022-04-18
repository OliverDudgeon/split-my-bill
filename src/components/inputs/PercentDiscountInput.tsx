import type { ReactElement } from 'react';

import { Input } from './Input';

export function PercentDiscountInput(): ReactElement {
  return (
    <label>
      % Discount
      <Input name="percentDiscount" type="number" />
    </label>
  );
}
