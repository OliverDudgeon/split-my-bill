import type { CSSProperties } from 'react';

import { useViewport } from './useViewport';

export function useGridTemplateColumns(columns: number): CSSProperties {
  const { width } = useViewport();
  const isMobile = (width ?? 0) < 640;

  return {
    gridTemplateColumns: isMobile
      ? 'repeat(3, minmax(0, 1fr))'
      : `minmax(10rem, 1.4fr) 5rem 6.5rem repeat(${columns}, minmax(7rem, 1fr))`,
  };
}
