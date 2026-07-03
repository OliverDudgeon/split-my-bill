import type { CSSProperties } from 'react';

export function useGridTemplateColumns(columns: number): CSSProperties {
  return {
    gridTemplateColumns: `minmax(10rem, 1.4fr) 5rem 6.5rem repeat(${columns}, minmax(7rem, 1fr))`,
  };
}
