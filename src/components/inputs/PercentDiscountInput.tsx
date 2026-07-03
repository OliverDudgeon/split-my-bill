import type { ReactElement } from 'react';

import { percentageMultiplierText } from '../../constants';
import { Input } from './Input';

export function PercentDiscountInput(): ReactElement {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black uppercase tracking-[0.24em] text-teal-800 dark:text-teal-300">
        {percentageMultiplierText}
      </span>
      <Input className="w-full" name="percentageMultiplier" type="number" />
    </label>
  );
}
