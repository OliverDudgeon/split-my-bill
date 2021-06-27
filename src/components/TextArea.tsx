import React, { ChangeEvent, ReactElement } from 'react';

import { FieldHookConfig, FieldInputProps, useField } from 'formik';

interface TextAreaProperties {
  className: string;
  onValueChange: (event: ChangeEvent<HTMLTextAreaElement>, field: FieldInputProps<string>) => void;
}

export const TextArea = ({
  className,
  onValueChange,
  ...properties
}: FieldHookConfig<string> & TextAreaProperties): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta] = useField(properties);
  return (
    <textarea
      {...field}
      className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      onChange={(event) => onValueChange(event, field)}
    />
  );
};
