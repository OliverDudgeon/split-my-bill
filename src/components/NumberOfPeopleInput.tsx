import React, { ChangeEvent } from 'react';

import { FieldHookConfig, FieldInputProps, useField } from 'formik';

import { Input } from './Input';

interface NumberOfPeopleInputProps {
  onValueChange: (event: ChangeEvent<HTMLInputElement>, field: FieldInputProps<string>) => void;
  label: string;
}

export const NumberOfPeopleInput = ({
  label,
  onValueChange,
  ...props
}: FieldHookConfig<string> & NumberOfPeopleInputProps) => {
  const [field, meta] = useField(props);

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
