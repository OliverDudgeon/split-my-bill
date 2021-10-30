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
  return <TextArea {...config} className="w-full self-center" onValueChange={onValueChange} />;
}
