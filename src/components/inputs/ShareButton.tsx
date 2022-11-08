import type { ReactElement } from 'react';

export function ShareButton(): ReactElement {
  const url = window.location.href;

  return (
    <a
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      href={`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`}
      rel="noreferrer"
      target="_blank"
    >
      Share
    </a>
  );
}
