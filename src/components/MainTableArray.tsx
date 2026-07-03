import type { ReactElement } from 'react';
import { Fragment } from 'react';

import { FieldArray } from 'formik';

import type { ReceiptItemWithShare } from '../types';
import { getDiscountInputName, getShareInputName } from '../utils/inputs';
import { calculateDiscount, poundFormatter } from '../utils/money';
import { Input } from './inputs/Input';

export interface MainTableArrayProperties {
  receiptItems: ReceiptItemWithShare[];
  peoplesInitials: string[];
  numberOfPeople: number;
  onClick: (inputIndex: number) => void;
  focus: number;
}

export function MainTableArray({
  receiptItems,
  peoplesInitials,
  numberOfPeople,
  onClick,
  focus,
}: MainTableArrayProperties): ReactElement {
  return (
    <FieldArray name="receiptItems">
      {() =>
        receiptItems.map(({ item, price, shares, discount }, itemIndex) => {
          const inputIndex = numberOfPeople + itemIndex * (numberOfPeople + 1) + 1;
          return (
            <Fragment key={`${item}-${itemIndex}`}>
              <span
                className={`col-start-1 self-center rounded-2xl px-4 py-3 text-sm leading-5 ${
                  Math.floor((focus - 1 - numberOfPeople) / (numberOfPeople + 1)) === itemIndex
                    ? 'bg-orange-100 font-black text-orange-950 ring-2 ring-orange-300 dark:bg-orange-300 dark:text-orange-950 dark:ring-orange-200'
                    : 'bg-slate-100 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {item}
              </span>
              <span className="self-center rounded-2xl bg-slate-50 px-4 py-3 font-black text-slate-950 dark:bg-slate-800/80 dark:text-white">
                {discount === '' ? (
                  poundFormatter.format(calculateDiscount(discount, price))
                ) : (
                  <abbr title={`Originally ${poundFormatter.format(price)}`}>
                    {poundFormatter.format(calculateDiscount(discount, price))}
                  </abbr>
                )}
              </span>
              <Input
                className="w-full self-center"
                name={getDiscountInputName(itemIndex)}
                placeholder="discount"
                onClick={() => onClick(inputIndex)}
              />
              <FieldArray name={`receiptItems.${itemIndex}`}>
                {() =>
                  shares.map((_, personIndex) => (
                    <Input
                      className={`w-full self-center text-center ${
                        personIndex === 0 ? 'col-start-1' : ''
                      } sm:col-start-auto`}
                      key={personIndex}
                      name={getShareInputName(itemIndex, personIndex)}
                      placeholder={peoplesInitials[personIndex]}
                      onClick={() => onClick(inputIndex + personIndex + 1)}
                    />
                  ))
                }
              </FieldArray>
            </Fragment>
          );
        })
      }
    </FieldArray>
  );
}
