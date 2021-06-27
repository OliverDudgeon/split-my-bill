import React, { FC, Fragment } from 'react';

import { FieldArray } from 'formik';

import { Input } from './components/Input';
import { defaultNaturalNumberInputProps, defaultPriceInputProps } from './constants';
import { useViewport } from './hooks/useViewport';
import { poundFormatter } from './utils';

import type { FormikFormState } from './types';
interface GridViewProps {
  values: FormikFormState;
}

export const GridView: FC<GridViewProps> = ({ values }) => {
  const numOfPeople = 3;
  // const receiptItems: ReceiptItem[] = [];

  // const [priceSummary, setPriceSummary] = useState<number[] | null>(null);

  // useEffect(() => {
  //   if (formRef.current && receiptItems.length) {
  //     const formData = new FormData(formRef.current);
  //     const breakdown = calculatePriceSummaryFromFormData(formData, receiptItems, numOfPeople);
  //     setPriceSummary(sumPricesByPerson(breakdown));
  //   }
  // }, [formRef, receiptItems, numOfPeople]);

  // const handleChange = () => {
  //   if (formRef.current) {
  //     const formData = new FormData(formRef.current);
  //     const breakdown = calculatePriceSummaryFromFormData(formData, receiptItems, numOfPeople);
  //     setPriceSummary(sumPricesByPerson(breakdown));
  //   }
  // };

  const { width } = useViewport();
  const isBreakpointAl = (width ?? 0) < 640; // Tailwind xs breakpoint

  let gridTemplateColumns: string;
  if (isBreakpointAl) {
    gridTemplateColumns = `repeat(3, 1fr)`;
  } else {
    gridTemplateColumns = `minmax(5rem, 1fr) 5rem 5rem repeat(${numOfPeople}, minmax(5rem, 1fr))`;
  }

  return (
    <div className="grid gap-4 my-5" style={{ gridTemplateColumns }}>
      <FieldArray name="receiptItems">
        {() =>
          values.receiptItems.map(({ item, price, shares }, itemIndex) => (
            <Fragment key={`${item}-${itemIndex}`}>
              <p className="self-center col-start-1">{item}</p>
              <p className="self-center">{poundFormatter.format(price)}</p>
              <Input
                className="self-center w-full"
                name={`receiptItems.${itemIndex}.discount`}
                placeholder="discount"
                {...defaultPriceInputProps}
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
                      {...defaultNaturalNumberInputProps}
                    />
                  ))
                }
              </FieldArray>
            </Fragment>
          ))
        }
      </FieldArray>
    </div>
  );
};
