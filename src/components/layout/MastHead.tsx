import type { ReactElement, ReactNode } from 'react';

interface MastHeadProperties {
  children: ReactNode;
}

export function MastHead({ children }: MastHeadProperties): ReactElement {
  return (
    <header className="mx-auto mb-8 max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-stone-50/95 p-5 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-950/5 backdrop-blur dark:border-white/10 dark:bg-slate-900/90 dark:shadow-slate-950/30 dark:ring-white/10 sm:p-8 lg:p-10">
      {children}
    </header>
  );
}
