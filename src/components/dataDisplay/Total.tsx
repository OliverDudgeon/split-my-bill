import type { HTMLProps, ReactElement } from 'react';

import { poundFormatter } from '../../utils/money';

export interface TotalProperties extends HTMLProps<HTMLSpanElement> {
  price: number;
  subPrice?: number;
  label?: string;
  subLabel?: string;
}

function getText(subLabel = '', subPrice?: number): string | undefined {
  if (subPrice === 0) {
    return undefined;
  }
  if (subPrice !== undefined) {
    return `${subLabel}${poundFormatter.format(subPrice)}`;
  }
  return undefined;
}

export function Total({
  price,
  subPrice,
  label,
  subLabel,
  ...properties
}: TotalProperties): ReactElement {
  // const text = `${label + poundFormatter.format(price)}`;
  const text = getText(label, price);
  const subText = getText(subLabel, subPrice);

  return (
    <span {...properties}>
      {text} {subText && `(${subText})`}
    </span>
  );
}

// '▲' : '▼'
