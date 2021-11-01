import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer className="max-w-screen-lg mx-auto my-6">
      <ul>
        <li>Created By Oliver Dudgeon</li>
        <a
          className="text-blue-700"
          href="https://github.com/OliverDudgeon/split-my-bill"
          rel="noopener noreferrer"
          target="_blank"
        >
          <li>Open Sourced on GitHub</li>
        </a>
      </ul>
    </footer>
  );
}
