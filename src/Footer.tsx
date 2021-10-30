import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer>
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
