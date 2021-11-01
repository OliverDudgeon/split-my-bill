import type { ReactElement } from 'react';

import { Input } from './Input';

export function ServiceChargeInput(): ReactElement {
  return (
    <label>
      Service Charge (%)
      <Input name="serviceCharge" type="number" />
    </label>
  );
}
