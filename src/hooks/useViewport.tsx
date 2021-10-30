/**
 * Context + Hook to get current viewport width & height
 * Originally from https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
 * Modified for typescript.
 */

import type { ReactElement, ReactNode } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface Size {
  width?: number;
  height?: number;
}

const viewportContext = createContext<Size>({});

export function ViewportProvider({ children }: { children: ReactNode }): ReactElement {
  // This is the exact same logic that we previously had in our hook

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const value = useMemo(() => ({ width, height }), [width, height]);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  /* Now we are dealing with a context instead of a Hook, so instead
      of returning the width and height we store the values in the
      value of the Provider */
  return <viewportContext.Provider value={value}>{children}</viewportContext.Provider>;
}

/* Rewrite the "useViewport" hook to pull the width and height values
    out of the context instead of calculating them itself */
export const useViewport = (): Size => {
  /* We can use the "useContext" Hook to access a context from within
      another Hook, remember, Hooks are composable! */
  const { width, height } = useContext(viewportContext);
  return { width, height };
};
