import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer className="mx-auto mt-10 pb-6 text-sm text-slate-600 dark:text-slate-300/80">
      <ul className="flex flex-col gap-2 rounded-3xl border border-slate-200 bg-white/70 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
        <li>Created by Oliver Dudgeon</li>
        <a
          className="font-semibold text-teal-700 transition hover:text-slate-950 dark:text-teal-200 dark:hover:text-white"
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
