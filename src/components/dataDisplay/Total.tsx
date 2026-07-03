import type { HTMLProps, ReactElement } from 'react';

import { poundFormatter } from '../../utils/money';

export interface TotalProperties extends HTMLProps<HTMLSpanElement> {
  price: number;
  subPrice?: number;
  label?: string;
  subLabel?: string;
}

function getSubText(subLabel = '', subPrice?: number): string | undefined {
  if (subPrice === undefined || subPrice === 0) {
    return undefined;
  }
  return `${subLabel}${poundFormatter.format(subPrice)}`;
}

export function Total({
  price,
  subPrice,
  label,
  subLabel,
  ...properties
}: TotalProperties): ReactElement {
  // const text = `${label + poundFormatter.format(price)}`;
  const text = `${label ?? ''}${poundFormatter.format(price)}`;
  const subText = getSubText(subLabel, subPrice);

  return (
    <span {...properties}>
      {text} {subText && <span className="text-xs font-semibold opacity-70">{`(${subText})`}</span>}
    </span>
  );
}

// '▲' : '▼'
