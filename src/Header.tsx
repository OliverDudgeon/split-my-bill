import type { ReactElement } from 'react';

export function Header(): ReactElement {
  return (
    <div className="mb-8 text-center">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.45em] text-teal-700 dark:text-teal-300">
        Receipt arithmetic without the awkward group chat
      </p>
      <h1 className="text-5xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-7xl">
        Split My Bill
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
        Paste a receipt, assign shares, fold in discounts, and get a clean total for everyone.
      </p>
    </div>
  );
}
