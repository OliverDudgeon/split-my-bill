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
              className={`font-bold self-center w-full col-start-auto ${
                personIndex === 0 ? 'sm:col-start-4' : ''
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
