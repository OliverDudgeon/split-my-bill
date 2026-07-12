import type { ReactElement } from 'react';
import { useState } from 'react';

const taglines = [
  'Split the bill, not the friendship',
  'For receipts too annoying to do in your head',
  'Everyone pays their bit. No spreadsheet required',
  'Because mental maths gets worse after dinner',
  'Less faff at the end of the meal',
  'Itemised chaos, neatly divided',
  'Fair shares without the napkin maths',
  'Because no one likes the “who owes what” conversation',
];

function getRandomTagline(): string {
  return taglines[Math.floor(Math.random() * taglines.length)] ?? taglines[0];
}

export function Header(): ReactElement {
  const [tagline] = useState(getRandomTagline);

  return (
    <div className="mb-8 text-center">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.45em] text-teal-700 dark:text-teal-300">
        {tagline}
      </p>
      <h1 className="text-5xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-7xl">
        Split My Bill
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
        Paste a receipt, assign shares, fold in discounts, and get a clean total for everyone.
      </p>
    </div>
  );
}
