import type { ReactElement } from 'react';

import { FieldArray } from 'formik';

import { getInitialsInputName } from '../utils/inputs';
import { Input } from './inputs/Input';

export interface InitialsInputsArrayProperties {
  peoplesInitials: string[];
  onClick: (inputIndex: number) => void;
}

export function InitialsInputsArray({
  peoplesInitials,
  onClick,
}: InitialsInputsArrayProperties): ReactElement {
  return (
    <FieldArray name="peoplesInitials">
      {() =>
        peoplesInitials.map((_person, personIndex) => {
          const inputIndex = personIndex + 1;
          return (
            <Input
              className={`col-start-auto w-full self-center border-teal-200 bg-teal-50/80 text-center font-black uppercase tracking-[0.18em] dark:border-teal-400/40 dark:bg-teal-950/40 ${
                personIndex === 0 ? 'col-start-4' : ''
              }`}
              key={personIndex}
              name={getInitialsInputName(personIndex)}
              placeholder="Initial"
              onClick={() => onClick(inputIndex)}
            />
          );
        })
      }
    </FieldArray>
  );
}
