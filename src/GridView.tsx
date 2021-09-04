import React, { FC, Fragment, useEffect } from 'react';

import { FieldArray } from 'formik';
import { useFocusInput } from 'hooks/useFocusInput';
import { useTrackFocus } from 'hooks/useTrackFocus';
import { throttle } from 'lodash';

import { Input } from './components/Input';
import { useViewport } from './hooks/useViewport';
import { compressEncode, minify } from './utils/serialisation';
import {
  getDiscountInputName,
  getInitialsInputName,
  getShareInputName,
  poundFormatter,
  sum,
  sumPricesByPerson,
} from './utils/utils';
import type { FormikFormState } from './types';

interface GridViewProperties {
  values: FormikFormState;
}

const updateUrl = throttle((url: string) => {
  window.history.pushState('', '', url);
}, 500);

export const GridView: FC<GridViewProperties> = ({ values }) => {
  // Handle keyboard navigation
  const [focus, setFocus] = useTrackFocus(
    values.receiptItems.length * (values.numberOfPeople + 1) + values.numberOfPeople,
    values.numberOfPeople + 1,
  );
  useFocusInput(focus, values.numberOfPeople);

  // Update URL with encoded data
  useEffect(() => {
    const minified = minify({ ...values });
    const url = compressEncode(minified);
    updateUrl(`?${url}`);
  });

  // Divide the receipt
  const splitItems = values.receiptItems.map(({ price, discount, shares }) => {
    // discount is a FormDataEntryValue - assume a number has been inputted
    const actualPrice = price - (Number.parseInt(discount, 10) || 0);

    const totalShares = sum(shares.map((share) => Number.parseInt(share, 10) || 0));

    if (totalShares === 0) {
      return Array.from({ length: values.numberOfPeople }).fill(
        actualPrice / values.numberOfPeople,
      ) as number[];
    }
    return shares.map((share) => (actualPrice * (Number.parseInt(share, 10) || 0)) / totalShares);
  });
  const priceSummary = sumPricesByPerson(splitItems);

  // Responsive UI
  const { width } = useViewport();
  const isBreakpointAl = (width ?? 0) < 640; // Tailwind xs breakpoint

  const gridTemplateColumns = isBreakpointAl
    ? `repeat(3, 1fr)`
    : `minmax(5rem, 1fr) 5rem 5.5rem repeat(${values.numberOfPeople}, minmax(7rem, 1fr))`;

  return (
    <div className="grid gap-4 my-5" style={{ gridTemplateColumns }}>
      <FieldArray name="peoplesInitials">
        {() =>
          values.peoplesInitials.map((person, personIndex) => {
            const inputIndex = personIndex + 1;
            return (
              <Input
                className={`font-bold self-center w-full col-start-auto ${
                  personIndex === 0 ? 'sm:col-start-4' : ''
                }`}
                key={personIndex}
                name={getInitialsInputName(personIndex)}
                placeholder="Initial"
                onClick={() => setFocus(inputIndex)}
              />
            );
          })
        }
      </FieldArray>
      <FieldArray name="receiptItems">
        {() =>
          values.receiptItems.map(({ item, price, shares, discount }, itemIndex) => {
            const inputIndex = values.numberOfPeople + itemIndex * (values.numberOfPeople + 1) + 1;
            return (
              <Fragment key={`${item}-${itemIndex}`}>
                <span
                  className={`self-center col-start-1 ${
                    Math.floor(
                      (focus - 1 - values.numberOfPeople) / (values.numberOfPeople + 1),
                    ) === itemIndex
                      ? 'font-bold'
                      : ''
                  }`}
                >
                  {item}
                </span>
                <span className="self-center">
                  {poundFormatter.format(price - (Number.parseInt(discount, 10) || 0))}
                </span>
                <Input
                  className="self-center w-full"
                  name={getDiscountInputName(itemIndex)}
                  placeholder="discount"
                  onClick={() => setFocus(inputIndex)}
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
                        placeholder={values.peoplesInitials[personIndex]}
                        onClick={() => setFocus(inputIndex + personIndex + 1)}
                      />
                    ))
                  }
                </FieldArray>
              </Fragment>
            );
          })
        }
      </FieldArray>
      <b>Total:</b>
      <b className="col-start-2">
        {poundFormatter.format(
          sum(
            values.receiptItems.map(
              ({ price, discount }) => price - (Number.parseInt(discount, 10) || 0),
            ),
          ),
        )}
      </b>
      {priceSummary.map((price, personIndex) => {
        const initial = values.peoplesInitials[personIndex];
        const formattedPrice = poundFormatter.format(price);
        return (
          <span className={personIndex === 0 ? 'col-start-1 sm:col-start-4' : ''} key={personIndex}>
            {`${initial ? `${initial}: ` : ''}${formattedPrice}`}
          </span>
        );
      })}
    </div>
  );
};
