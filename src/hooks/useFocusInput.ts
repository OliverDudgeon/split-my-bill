import { useEffect } from 'react';

import { getInputName } from 'utils/utils';

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
  }, [focus, numberOfPeople]);
};
