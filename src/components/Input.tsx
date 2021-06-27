import React, { FC, InputHTMLAttributes } from 'react';

import { Field } from 'formik';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...properties }) => (
  <Field
    className={`shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline appearance-none ${className ?? ''}`}
    {...properties}
  />
);
