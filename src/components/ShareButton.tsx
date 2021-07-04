import React, { FC } from 'react';

const handleShare = async () => {
  const url = window.location.href;
  const response = await fetch(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
  const shortUrl = await response.text();
  await navigator.clipboard.writeText(shortUrl);
};

export const ShareButton: FC = () => (
  <button
    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    type="button"
    onClick={(event) => {
      event.preventDefault();
      handleShare().catch(() => {
        // TODO
      });
    }}
  >
    Share
  </button>
);
