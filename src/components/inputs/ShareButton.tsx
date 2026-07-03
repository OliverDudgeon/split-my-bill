import type { ReactElement } from 'react';

export function ShareButton(): ReactElement {
  const url = globalThis.location.href;

  return (
    <a
      className="inline-flex items-center justify-center rounded-2xl bg-teal-400 px-6 py-3 font-black text-slate-950 shadow-lg shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-teal-300 focus:outline-hidden focus:ring-4 focus:ring-teal-300/50"
      href={`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`}
      rel="noreferrer"
      target="_blank"
    >
      Share
    </a>
  );
}
