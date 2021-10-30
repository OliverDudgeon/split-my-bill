import type { ReactElement } from 'react';

export function Header(): ReactElement {
  return (
    <header className="2xl:container mx-auto">
      <h1 className="text-xl">Split My Bill</h1>
    </header>
  );
}
