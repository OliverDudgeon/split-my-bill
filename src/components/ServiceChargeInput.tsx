import type { FC } from 'react';
import React from 'react';

import { Input } from './Input';

export const ServiceChargeInput: FC = () => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label>
    Service Charge (%)
    <Input name="serviceCharge" type="number" />
  </label>
);
