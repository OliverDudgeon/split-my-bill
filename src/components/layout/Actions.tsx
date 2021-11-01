import type { ReactElement } from 'react';

import { ShareButton } from '../inputs/ShareButton';

export function Actions(): ReactElement {
  return (
    <div>
      <p>Click the button to copy a shortened url to share with your splitees</p>
      <ShareButton />
    </div>
  );
}
