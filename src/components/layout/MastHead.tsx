import type { ReactElement, ReactNode } from 'react';

interface MastHeadProperties {
  children: ReactNode;
}

export function MastHead({ children }: MastHeadProperties): ReactElement {
  return <header className="max-w-screen-sm mx-auto mb-12">{children}</header>;
}
