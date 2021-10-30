import { useCallback, useEffect, useState } from 'react';

export function useTrackFocus(
  size: number,
  verticalStep: number,
): readonly [number, React.Dispatch<React.SetStateAction<number>>] {
  const [currentFocus, setCurrentFocus] = useState(1);

  const handleKeyInput = useCallback(
    (event: KeyboardEvent) => {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (event.target as any)?.tagName === 'INPUT' &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (event.target as any).name !== 'numberOfPeople'
      ) {
        switch (event.key) {
          case 'Tab': {
            if (event.shiftKey) {
              if (currentFocus !== 1) {
                event.preventDefault();
                setCurrentFocus(currentFocus - 1);
              }
            } else if (currentFocus !== size) {
              event.preventDefault();
              setCurrentFocus(currentFocus + 1);
            }

            break;
          }
          case 'ArrowRight': {
            // Right arrow
            event.preventDefault();
            setCurrentFocus(Math.min(currentFocus + 1, size));

            break;
          }

          case 'ArrowLeft': {
            // Left arrow
            event.preventDefault();
            setCurrentFocus(Math.max(1, currentFocus - 1));

            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            setCurrentFocus(Math.max(1, currentFocus - verticalStep));

            break;
          }
          case 'ArrowDown': {
            event.preventDefault();
            setCurrentFocus(Math.min(currentFocus + verticalStep, size));

            break;
          }
          default:
          // Do Nothing
        }
      }
    },
    [verticalStep, size, currentFocus, setCurrentFocus],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyInput, false);
    return () => {
      document.removeEventListener('keydown', handleKeyInput, false);
    };
  }, [handleKeyInput]);

  return [currentFocus, setCurrentFocus] as const;
}
