import React, { FC, InputHTMLAttributes, useEffect, useRef } from 'react';

import { Field } from 'formik';

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export const Input: FC<InputProperties> = ({ className, focus, ...properties }) => {
  const reference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus) {
      // Move element into view when it is focused
      reference.current?.focus();
    }
  }, [focus]);

  return (
    <Field
      className={`shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none
                  focus:shadow-outline appearance-none ${className ?? ''}`}
      {...properties}
      innerRef={reference}
      tabIndex={focus ? 0 : focus === undefined ? undefined : -1}
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
};
