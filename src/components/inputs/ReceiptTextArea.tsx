import type { ChangeEvent, ReactElement } from 'react';

import type { FieldHookConfig, FieldInputProps } from 'formik';

import { TextArea } from './TextArea';

interface ReceiptTextAreaProperties {
  onValueChange: (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => void;
}

export function ReceiptTextArea({
  onValueChange,
  ...config
}: FieldHookConfig<string> & ReceiptTextAreaProperties): ReactElement {
  return (
    <div className="block">
      <span className="mb-2 block text-sm font-black uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        Receipt text
      </span>
      <TextArea
        {...config}
        className="min-h-72 w-full resize-y self-center"
        onValueChange={onValueChange}
      />
    </div>
  );
}
