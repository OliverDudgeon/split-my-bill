import type { ChangeEvent, ReactElement } from 'react';

import type { FieldHookConfig, FieldInputProps } from 'formik';
import { useField } from 'formik';

interface TextAreaProperties {
  className: string;
  onValueChange: (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => void;
}

export function TextArea({
  className,
  onValueChange,
  ...properties
}: FieldHookConfig<string> & TextAreaProperties): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta] = useField(properties);
  return (
    <textarea
      {...field}
      className={`appearance-none rounded-3xl border border-slate-300 bg-white/90 px-5 py-4 font-mono text-sm leading-7 text-slate-900 shadow-inner shadow-slate-200/70 transition placeholder:text-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950/80 dark:text-white dark:shadow-black/20 dark:placeholder:text-slate-500 ${className}`}
      onChange={(event) => {
        onValueChange(event, field);
      }}
    />
  );
}
