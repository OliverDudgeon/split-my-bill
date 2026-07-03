import type { InputHTMLAttributes, ReactElement } from 'react';
import { useRef } from 'react';

import { Field } from 'formik';

type InputProperties = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...properties }: InputProperties): ReactElement {
  const reference = useRef<HTMLInputElement>(null);

  return (
    <Field
      className={`appearance-none rounded-2xl border border-slate-300 bg-white/90 px-4 py-3 leading-tight text-slate-900 shadow-inner shadow-slate-200/70 transition placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-500 focus:outline-hidden focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white dark:shadow-black/20 dark:placeholder:text-slate-500 dark:disabled:bg-slate-900 dark:disabled:text-slate-400 ${className ?? ''}`}
      {...properties}
      innerRef={reference}
      onKeyDown={(event: KeyboardEvent) => {
        // Prevent focus switch when in middle of text
        const position = reference.current?.selectionStart; // Cursor position
        const textLength = reference.current?.value.length ?? 0;

        if (typeof position === 'number') {
          if (event.key === 'ArrowLeft' && position !== 0) {
            event.stopPropagation();
          }
          if (event.key === 'ArrowRight' && position < textLength) {
            event.stopPropagation();
          }
        }
      }}
    />
  );
}
