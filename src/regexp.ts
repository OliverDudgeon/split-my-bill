export const ITEM_REGEX = /^\s*([^$£€]+)(-?)([$£€]|kr)?(\d+\.?\d{0,2})([$£€]|kr)?\s*?/m;
export const CURRENCY_SYMBOLS_REGEXP = /[$£€]|kr/gu;
export const MONEY_AMOUNT_REGEXP =
  /(-)?\s*(?:[$£€]|kr)?\s*(-)?(?:\d+(?:[',.]\d{0,2})?|[',.]\d{1,2})\s*(?:[$£€]|kr)?\s*\n/gm;
