import { useEffect } from 'react';

import { getInputName } from '../utils/inputs';

export const useFocusInput = (focus: number, numberOfPeople: number): void => {
  useEffect(() => {
    const row = Math.floor(focus / (numberOfPeople + 1));
    const column = focus % (numberOfPeople + 1);

    const name = getInputName(row, column);
    const inputs = document.getElementsByName(name);
    if (inputs.length !== 1) {
      throw new Error(`Found ${inputs.length} inputs with the 'name': ${name} @ focus = ${focus}`);
    }
    inputs[0].focus();

    // Including 'numberOfPeople' in here causes the focus to move when changing number of people
    // This causes the keyboard to popup on mobile devices -- a bad UX
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);
};
