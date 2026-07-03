export const ITEM_REGEX = /^\s*([^$£€]+)(-?)([$£])?(\d+\.?\d{0,2})(€)?\s*?/m;
export const CURRENCY_SYMBOLS_REGEXP = /[$£€]/gu;
export const MONEY_AMOUNT_REGEXP =
  /(-)?\s*[$£€]?\s*(-)?(?:\d+(?:[',.]\d{0,2})?|[',.]\d{1,2})\s*[$£€]?\s*\n/gm;
