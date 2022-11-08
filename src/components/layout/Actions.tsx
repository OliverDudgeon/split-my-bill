import type { ReactElement } from 'react';

import { ShareButton } from '../inputs/ShareButton';

export function Actions(): ReactElement {
  return (
    <div className="max-w-screen-sm mx-auto mb-12">
      <p className="mb-3">Click the button to create a shortened url to share with your splitees</p>
      <ShareButton />
    </div>
  );
}
