import type { FC, InputHTMLAttributes } from 'react';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      className="w-full self-center shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline appearance-none"
      {...props}
    />
  );
};
