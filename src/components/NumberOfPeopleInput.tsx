import React, { ChangeEvent } from 'react';

import { FieldHookConfig, FieldInputProps, useField } from 'formik';

import { Input } from './Input';

interface NumberOfPeopleInputProperties {
  onValueChange: (event: ChangeEvent<HTMLInputElement>, field: FieldInputProps<string>) => void;
  label: string;
}

export const NumberOfPeopleInput = ({
  label,
  onValueChange,
  ...properties
}: FieldHookConfig<string> & NumberOfPeopleInputProperties): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta] = useField(properties);

  return (
    <>
      <label htmlFor="number-of-people">{label}</label>
      <Input
        {...field}
        id="number-of-people"
        min={2}
        type="number"
        onChange={(event) => onValueChange(event, field)}
      />
    </>
  );
};
