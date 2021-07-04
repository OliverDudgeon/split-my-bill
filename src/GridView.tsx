import React, { FC, Fragment, useEffect } from 'react';

import { Field, FieldArray } from 'formik';

import { throttle } from 'lodash';
import { compressEncode, minify } from './utils/serialisation';
import { Input } from './components/Input';
import { defaultNaturalNumberInputProperties, defaultPriceInputProperties } from './constants';
import { useViewport } from './hooks/useViewport';
import { poundFormatter, sum, sumPricesByPerson } from './utils/utils';

import type { FormikFormState } from './types';

interface GridViewProperties {
  values: FormikFormState;
}

const updateUrl = throttle((url: string) => {
  window.history.pushState('', '', url);
}, 500);

export const GridView: FC<GridViewProperties> = ({ values }) => {
  useEffect(() => {
    const minified = minify({ ...values });
    const url = compressEncode(minified);
    updateUrl(`?${url}`);
  });

  const priceSummary = sumPricesByPerson(
    values.receiptItems.map(({ price, discount, shares }) => {
      // discount is a FormDataEntryValue - assume a number has been inputted
      const actualPrice = discount !== '' ? price - discount : price;

      const totalShares = sum(shares.map((share) => share || 0));

      if (totalShares === 0) {
        return Array.from({ length: values.numberOfPeople }).fill(
          actualPrice / values.numberOfPeople,
        ) as number[];
      }
      return shares.map((share) => (actualPrice * (share || 0)) / totalShares);
    }),
  );

  const { width } = useViewport();
  const isBreakpointAl = (width ?? 0) < 640; // Tailwind xs breakpoint

  const gridTemplateColumns = isBreakpointAl
    ? `repeat(3, 1fr)`
    : `minmax(5rem, 1fr) 5rem 5rem repeat(${values.numberOfPeople}, minmax(7rem, 1fr))`;

  return (
    <div className="grid gap-4 my-5" style={{ gridTemplateColumns }}>
      <FieldArray name="peoplesInitials">
        {() =>
          values.peoplesInitials.map((person, personIndex) => (
            <Input
              className={`font-bold self-center w-full col-start-auto ${
                personIndex === 0 ? 'sm:col-start-4' : ''
              }`}
              name={`peoplesInitials.${personIndex}`}
              placeholder="Initial"
            />
          ))
        }
      </FieldArray>
      <FieldArray name="receiptItems">
        {() =>
          values.receiptItems.map(({ item, price, shares, discount }, itemIndex) => (
            <Fragment key={`${item}-${itemIndex}`}>
              <span className="self-center col-start-1">{item}</span>
              <span className="self-center">{poundFormatter.format(price - (discount || 0))}</span>
              <Input
                className="self-center w-full"
                name={`receiptItems.${itemIndex}.discount`}
                placeholder="discount"
                {...defaultPriceInputProperties}
              />
              <FieldArray name={`receiptItems.${itemIndex}`}>
                {() =>
                  shares.map((_, personIndex) => (
                    <Input
                      className={`self-center w-full ${
                        personIndex === 0 ? 'col-start-1' : ''
                      } sm:col-start-auto`}
                      key={personIndex}
                      name={`receiptItems.${itemIndex}.shares.${personIndex}`}
                      placeholder={values.peoplesInitials[personIndex]}
                      {...defaultNaturalNumberInputProperties}
                    />
                  ))
                }
              </FieldArray>
            </Fragment>
          ))
        }
      </FieldArray>
      <b>Total:</b>
      <b className="col-start-2">
        {poundFormatter.format(
          sum(values.receiptItems.map(({ price, discount }) => price - (discount || 0))),
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
