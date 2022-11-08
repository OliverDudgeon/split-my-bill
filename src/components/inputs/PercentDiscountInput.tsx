import type { ReactElement } from 'react';

import { percentageMultiplierText } from '../../constants';
import { Input } from './Input';

export function PercentDiscountInput(): ReactElement {
  return (
    <label>
      {percentageMultiplierText}&nbsp;
      <Input name="percentageMultiplier" type="number" />
    </label>
  );
}
