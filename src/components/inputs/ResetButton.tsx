import type { ReactElement } from 'react';

export interface ResetButtonProperties {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProperties): ReactElement {
  return (
    <button
      className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 focus:outline-hidden focus:ring-4 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200 dark:hover:border-orange-400/60 dark:hover:bg-orange-950/40 dark:hover:text-orange-200"
      type="button"
      onClick={onReset}
    >
      Reset
    </button>
  );
}
