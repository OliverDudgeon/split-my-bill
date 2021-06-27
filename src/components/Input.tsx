import React from 'react';

import { Field } from 'formik';

import type { FC, InputHTMLAttributes } from 'react';
export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
  return (
    <Field
      className={`shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline appearance-none ${className}`}
      {...props}
    />
  );
};
