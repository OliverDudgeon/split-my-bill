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
                className={`self-center col-start-1 ${
                  Math.floor((focus - 1 - numberOfPeople) / (numberOfPeople + 1)) === itemIndex
                    ? 'font-bold'
                    : ''
                }`}
              >
                {item}
              </span>
              <span className="self-center">
                {poundFormatter.format(calculateDiscount(discount, price))}
              </span>
              <Input
                className="self-center w-full"
                name={getDiscountInputName(itemIndex)}
                placeholder="discount"
                onClick={() => onClick(inputIndex)}
              />
              <FieldArray name={`receiptItems.${itemIndex}`}>
                {() =>
                  shares.map((_, personIndex) => (
                    <Input
                      className={`self-center w-full ${
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
