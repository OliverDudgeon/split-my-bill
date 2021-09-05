import type { FC, HTMLProps } from 'react';
import React from 'react';

export interface IncrementButtonProperties extends HTMLProps<HTMLButtonElement> {
  side?: 'left' | 'right';
}

export const IncrementButton: FC<IncrementButtonProperties> = ({
  children,
  className,
  side,
  ...properties
}) => (
  <button
    {...properties}
    className={`shadow-sm border ${
      side === undefined ? 'rounded' : side === 'left' ? 'rounded-l' : 'rounded-r'
    } text-2xl px-3 text-gray-700 leading-tight focus:outline-none
    focus:shadow-outline appearance-none ${className ?? ''}`}
    type="button"
  >
    {children}
  </button>
);
