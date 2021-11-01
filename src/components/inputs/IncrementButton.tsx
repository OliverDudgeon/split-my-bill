import type { HTMLProps, ReactElement } from 'react';

export interface IncrementButtonProperties extends HTMLProps<HTMLButtonElement> {
  side?: 'left' | 'right';
}

export function IncrementButton({
  children,
  className,
  side,
  ...properties
}: IncrementButtonProperties): ReactElement {
  const roundedClass = () => {
    switch (side) {
      case 'left':
        return 'rounded-l';
      case 'right':
        return 'rounded-r';
      default:
        return 'rounded';
    }
  };
  return (
    <button
      {...properties}
      className={`shadow-sm border ${roundedClass()} text-2xl px-3 text-gray-700 leading-tight focus:outline-none
    focus:shadow-outline appearance-none ${className ?? ''}`}
      type="button"
    >
      {children}
    </button>
  );
}
