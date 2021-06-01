import { FC, useEffect, useRef, useState } from 'react';
import { poundFormatter, range, sum, sumPricesByPerson } from './utils';

const defaultPriceInputProps = { type: 'number', min: 0, step: 0.01 };
const defaultNaturalNumberInputProps = { type: 'number', min: 0, step: 1 };

export type ReceiptItem = [string, number];

const calculatePriceSummaryFromFormData = (
  formData: FormData,
  receiptItems: ReceiptItem[],
  numOfPeople: number,
) => {
  return receiptItems.map(([, price], itemIndex) => {
    const discount = Number(formData.get(`discount-${itemIndex}`));
    const shares = range(numOfPeople).map((personIndex) =>
      Number(formData.get(`share-${itemIndex}-${personIndex}`)),
    );

    // discount is a FormDataEntryValue - assume a number has been inputted
    const actualPrice = price - discount;

    const totalShares = sum(shares);

    if (totalShares === 0) {
      return new Array(numOfPeople).fill(actualPrice / numOfPeople);
    } else {
      return shares.map((share) => (actualPrice * share) / totalShares);
    }
  });
};

interface GridViewProps {
  receiptItems: ReceiptItem[];
  numOfPeople: number;
}

export const GridView: FC<GridViewProps> = ({ receiptItems, numOfPeople }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [priceSummary, setPriceSummary] = useState<number[] | null>(null);

  useEffect(() => {
    if (formRef.current && receiptItems.length) {
      const formData = new FormData(formRef.current);
      const breakdown = calculatePriceSummaryFromFormData(formData, receiptItems, numOfPeople);
      setPriceSummary(sumPricesByPerson(breakdown));
    }
  }, [formRef, receiptItems, numOfPeople]);

  const handleChange = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const breakdown = calculatePriceSummaryFromFormData(formData, receiptItems, numOfPeople);
      setPriceSummary(sumPricesByPerson(breakdown));
    }
  };

  return (
    <form
      className="grid gap-4"
      ref={formRef}
      style={{ gridTemplateColumns: `1fr 4rem 5rem repeat(${numOfPeople}, 5rem)` }}
      onChange={handleChange}
    >
      {range(numOfPeople).map((personIndex) => (
        <input
          className="w-16"
          key={personIndex}
          placeholder="initial"
          style={{ gridColumnStart: personIndex + 4 }}
        />
      ))}

      {receiptItems.map(([item, price], itemIndex) => (
        <>
          <div className="inline-block w-96">{item}</div>
          <div className="inline-block w-16">{poundFormatter.format(price)}</div>
          <input
            className="w-20"
            name={`discount-${itemIndex}`}
            placeholder="discount"
            {...defaultPriceInputProps}
          />
          {range(numOfPeople).map((personIndex) => (
            <input
              className="w-16"
              key={personIndex}
              name={`share-${itemIndex}-${personIndex}`}
              placeholder="share"
              {...defaultNaturalNumberInputProps}
            />
          ))}
        </>
      ))}
      {priceSummary?.map((price, personIndex) => (
        <p key={personIndex} style={{ gridColumnStart: personIndex + 4 }}>
          {poundFormatter.format(price)}
        </p>
      ))}
    </form>
  );
};
