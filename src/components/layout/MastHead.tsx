import type { ReactElement, ReactNode } from 'react';

interface MastHeadProperties {
  children: ReactNode;
}

export function MastHead({ children }: MastHeadProperties): ReactElement {
  return <header>{children}</header>;
}
