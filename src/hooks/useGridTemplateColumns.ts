import type { CSSProperties } from 'react';

import { useViewport } from './useViewport';

export function useGridTemplateColumns(columns: number): CSSProperties {
  // Responsive UI
  const { width } = useViewport();
  const isBreakpointAl = (width ?? 0) < 640; // Tailwind xs breakpoint

  const gridTemplateColumns = isBreakpointAl
    ? `repeat(3, 1fr)`
    : `minmax(5rem, 1fr) 5rem 5.5rem repeat(${columns}, minmax(7rem, 1fr))`;

  return { gridTemplateColumns };
}
