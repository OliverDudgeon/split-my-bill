import type { InputHTMLAttributes, ReactElement } from 'react';
import { useRef } from 'react';

import { Field } from 'formik';

type InputProperties = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...properties }: InputProperties): ReactElement {
  const reference = useRef<HTMLInputElement>(null);

  return (
    <Field
      className={`shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none
                  focus:shadow-outline appearance-none ${className ?? ''}`}
      {...properties}
      innerRef={reference}
      onKeyDown={(event: KeyboardEvent) => {
        // Prevent focus switch when in middle of text
        const position = reference.current?.selectionStart; // Cursor position
        const textLength = reference.current?.value.length ?? 0;

        if (typeof position === 'number') {
          if (event.key === 'ArrowLeft' && position !== 0) {
            event.stopPropagation();
          }
          if (event.key === 'ArrowRight' && position < textLength) {
            event.stopPropagation();
          }
        }
      }}
    />
  );
}
