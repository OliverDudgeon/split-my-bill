import type { HTMLProps, ReactElement } from 'react';

export interface IncrementButtonProperties extends HTMLProps<HTMLButtonElement> {
  side?: 'left' | 'right';
}

export function IncrementButton({
  children,
  className,
  side,
  ...properties
}: IncrementButtonProperties): ReactElement {
  const roundedClass = () => {
    switch (side) {
      case 'left': {
        return 'rounded-l';
      }
      case 'right': {
        return 'rounded-r';
      }
      default: {
        return 'rounded';
      }
    }
  };
  return (
    <button
      {...properties}
      className={`border border-slate-300 bg-slate-950 px-4 text-2xl font-black leading-tight text-white shadow-sm transition hover:bg-teal-600 focus:outline-hidden focus:ring-4 focus:ring-teal-500/20 dark:border-slate-700 ${roundedClass()} appearance-none ${className ?? ''}`}
      type="button"
    >
      {children}
    </button>
  );
}
