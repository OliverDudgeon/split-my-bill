import type { FC, HTMLProps } from 'react';
import React from 'react';

export const IncrementButton: FC<HTMLProps<HTMLButtonElement> & { side?: 'left' | 'right' }> = ({
  children,
  className,
  side,
  ...properties
}) => (
  <button
    {...properties}
    className={`shadow border ${
      side === undefined ? 'rounded' : side === 'left' ? 'rounded-l' : 'rounded-r'
    } py-2 px-3 text-gray-700 leading-tight focus:outline-none
    focus:shadow-outline appearance-none ${className ?? ''}`}
    type="button"
  >
    {children}
  </button>
);
