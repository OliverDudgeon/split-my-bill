import type { HTMLProps, ReactElement } from 'react';

import type { CurrencyFormat } from '../../utils/money';
import { formatMoney } from '../../utils/money';

export interface TotalProperties extends HTMLProps<HTMLSpanElement> {
  price: number;
  subPrice?: number;
  label?: string;
  subLabel?: string;
  currencyFormat: CurrencyFormat;
}

function getSubText(
  currencyFormat: CurrencyFormat,
  subLabel = '',
  subPrice?: number,
): string | undefined {
  if (subPrice === undefined || subPrice === 0) {
    return undefined;
  }
  return `${subLabel}${formatMoney(subPrice, currencyFormat)}`;
}

export function Total({
  price,
  subPrice,
  label,
  subLabel,
  currencyFormat,
  ...properties
}: TotalProperties): ReactElement {
  const text = `${label ?? ''}${formatMoney(price, currencyFormat)}`;
  const subText = getSubText(currencyFormat, subLabel, subPrice);

  return (
    <span {...properties}>
      {text} {subText && <span className="text-xs font-semibold opacity-70">{`(${subText})`}</span>}
    </span>
  );
}

// '▲' : '▼'
