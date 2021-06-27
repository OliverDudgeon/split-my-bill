import type { ChangeEvent, FC, HTMLProps } from 'react';

import { FieldHookConfig, FieldInputProps, useField } from 'formik';

interface TextAreaProps {
  className: string;
  onValueChange: (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => void;
}

export const TextArea = ({
  className,
  onValueChange,
  ...props
}: FieldHookConfig<string> & TextAreaProps) => {
  const [field, meta] = useField(props);
  return (
    <textarea
      {...field}
      className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      onChange={(event) => onValueChange(event, field)}
    />
  );
};
