import type { ReceiptCurrency, ReceiptItem, ReceiptItemWithShare } from '../types';
import { range, sum } from './utils';

const defaultCurrency = 'GBP';
const defaultLocale = 'en-GB';

const currencyBySymbol: Record<string, string> = {
  $: 'USD',
  '£': 'GBP',
  '€': 'EUR',
  kr: 'DKK',
};

const currencyByRegion: Record<string, string> = {
  AD: 'EUR',
  AT: 'EUR',
  AU: 'AUD',
  BE: 'EUR',
  BR: 'BRL',
  CA: 'CAD',
  CH: 'CHF',
  CN: 'CNY',
  CY: 'EUR',
  CZ: 'CZK',
  DE: 'EUR',
  DK: 'DKK',
  EE: 'EUR',
  ES: 'EUR',
  FI: 'EUR',
  FR: 'EUR',
  GB: 'GBP',
  GR: 'EUR',
  HU: 'HUF',
  IE: 'EUR',
  IN: 'INR',
  IT: 'EUR',
  JP: 'JPY',
  LT: 'EUR',
  LU: 'EUR',
  LV: 'EUR',
  MT: 'EUR',
  MX: 'MXN',
  NL: 'EUR',
  NO: 'NOK',
  NZ: 'NZD',
  PL: 'PLN',
  PT: 'EUR',
  SE: 'SEK',
  SI: 'EUR',
  SK: 'EUR',
  US: 'USD',
  ZA: 'ZAR',
};

const currencyAmountRegexp =
  /(?:[-\s]*([$£€]|kr)(\s*)-?(?:\d+(?:[',.]\d{0,2})?|[',.]\d{1,2}))|(?:-?(?:\d+(?:[',.]\d{0,2})?|[',.]\d{1,2})(\s*)([$£€]|kr))/gu;

export interface CurrencyFormat {
  currency: string;
  locale: string;
  receiptCurrency?: ReceiptCurrency;
}

function getUserLocales(): string[] {
  const userNavigator = (globalThis as { navigator?: Pick<Navigator, 'language' | 'languages'> })
    .navigator;

  if (userNavigator?.languages.length) {
    return [...userNavigator.languages];
  }
  if (userNavigator?.language) {
    return [userNavigator.language];
  }
  return [defaultLocale];
}

function getRegionFromLocale(locale: string): string | undefined {
  return locale.match(/[-_]([A-Za-z]{2})(?:$|[-_])/u)?.[1]?.toUpperCase();
}

function getLocaleCurrency(locales: string[]): string | undefined {
  for (const locale of locales) {
    const region = getRegionFromLocale(locale);
    if (region && currencyByRegion[region]) {
      return currencyByRegion[region];
    }
  }
  return undefined;
}

export function detectReceiptCurrency(source: string): ReceiptCurrency | undefined {
  for (const match of source.matchAll(currencyAmountRegexp)) {
    if (match[1]) {
      return {
        symbol: match[1],
        symbolPosition: 'prefix',
        symbolSpacing: match[2].length > 0,
      };
    }

    if (match[4]) {
      return {
        symbol: match[4],
        symbolPosition: 'suffix',
        symbolSpacing: match[3].length > 0,
      };
    }
  }
  return undefined;
}

export function detectCurrencyFormat(
  source: string,
  explicitReceiptCurrency?: ReceiptCurrency | false,
): CurrencyFormat {
  const locales = getUserLocales();
  const locale = locales[0] ?? defaultLocale;
  const receiptCurrency =
    explicitReceiptCurrency === false
      ? undefined
      : (explicitReceiptCurrency ?? detectReceiptCurrency(source));

  return {
    currency:
      (receiptCurrency && currencyBySymbol[receiptCurrency.symbol]) ??
      getLocaleCurrency(locales) ??
      defaultCurrency,
    locale,
    receiptCurrency,
  };
}

export function formatMoney(value: number, currencyFormat: CurrencyFormat): string {
  const amount = Object.is(value, -0) ? 0 : value;

  if (currencyFormat.receiptCurrency) {
    const { symbol, symbolPosition, symbolSpacing } = currencyFormat.receiptCurrency;
    const sign = amount < 0 ? '-' : '';
    const formattedAmount = new Intl.NumberFormat(currencyFormat.locale, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
    const spacing = symbolSpacing ? ' ' : '';

    return symbolPosition === 'prefix'
      ? `${sign}${symbol}${spacing}${formattedAmount}`
      : `${sign}${formattedAmount}${spacing}${symbol}`;
  }

  return new Intl.NumberFormat(currencyFormat.locale, {
    style: 'currency',
    currency: currencyFormat.currency,
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
}

/**
 * Calculates a actual price from a price and a discount
 * @param discount the discount to be calculated: either a absolute price to be subtracted or a percentage
 * @param price the price the discount is taken from
 * @returns the calculated price
 */
export const calculateDiscount = (discount: string, price: number): number => {
  // discount is a string - it can be either a absolute number (1.50 meaning £1.50) or a percentage
  // (1.5% meaning a 0.95x multiplier)
  const parsedDiscount = Number.parseFloat(discount) || 0;
  if (discount.includes('%')) {
    return price * (1 - parsedDiscount / 100);
  }
  return price - parsedDiscount;
};

export const calculatePostDiscountTotal = (receiptItems: ReceiptItemWithShare[]) =>
  sum(receiptItems.map(({ price, discount }) => calculateDiscount(discount, price)));

export const calculatePercentDiscountFraction = (percentageMultiplier: string): number =>
  (Number.parseFloat(percentageMultiplier) || 0) / 100;

export const calculateTotal = (receiptItems: ReceiptItem[]): number =>
  sum(receiptItems.map((item) => item.price));

export const sumPricesByPerson = (prices: number[][]): number[] => {
  if (prices.length === 0) {
    return [];
  }
  return range(prices[0].length).map((index) => sum(prices.map((item) => item[index])));
};
