import type { ReactElement } from 'react';

import type { TotalProperties } from './Total';
import { Total } from './Total';

export function ColonTotal({ label, subLabel, ...properties }: TotalProperties): ReactElement {
  return (
    <Total
      label={label ? `${label}: ` : undefined}
      subLabel={subLabel ? `${subLabel}: ` : undefined}
      {...properties}
    />
  );
}
