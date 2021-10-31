import type { ReactElement } from 'react';

export interface ResetButtonProperties {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProperties): ReactElement {
  return (
    <button
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      type="button"
      onClick={onReset}
    >
      Reset
    </button>
  );
}
