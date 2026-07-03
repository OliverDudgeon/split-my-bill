import type { ReactElement } from 'react';

import { ShareButton } from '../inputs/ShareButton';

export function Actions(): ReactElement {
  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-[2rem] border border-slate-200 bg-white/75 p-5 text-slate-950 shadow-xl shadow-slate-950/10 backdrop-blur dark:border-white/15 dark:bg-white/10 dark:text-white dark:shadow-slate-950/20 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="mb-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-200 sm:mb-0">
        Ready to settle up? Create a shortened URL and share this exact split with your group.
      </p>
      <ShareButton />
    </div>
  );
}
