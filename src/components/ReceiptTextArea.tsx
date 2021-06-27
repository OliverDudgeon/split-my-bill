import React, { ChangeEvent } from 'react';

import { TextArea } from './TextArea';

import type { FieldHookConfig, FieldInputProps } from 'formik';

interface ReceiptTextAreaProps {
  onValueChange: (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => void;
}

export const ReceiptTextArea = ({
  onValueChange,
  ...config
}: FieldHookConfig<string> & ReceiptTextAreaProps) => {
  return <TextArea {...config} className="w-full self-center" onValueChange={onValueChange} />;
};
