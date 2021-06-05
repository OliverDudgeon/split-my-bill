import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { poundFormatter, range, sum, sumPricesByPerson } from './utils';
import { Input } from './components/Input';
import { useViewport } from './hooks/useViewport';

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
  const [peopleNames, setPeopleNames] = useState(new Array(numOfPeople));

  const updatePeoplesNames = (personIndex: number, value: string) => {
    peopleNames[personIndex] = value;
    setPeopleNames(peopleNames);
  };

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

  const { width } = useViewport();
  const isBreakpointAl = (width ?? 0) < 640; // Tailwind xs breakpoint

  let gridTemplateColumns: string;
  if (isBreakpointAl) {
    gridTemplateColumns = `repeat(3, 1fr)`;
  } else {
    gridTemplateColumns = `minmax(5rem, 1fr) 5rem 5rem repeat(${numOfPeople}, minmax(5rem, 1fr))`;
  }

  return (
    <form
      className="grid gap-4 my-5"
      ref={formRef}
      style={{ gridTemplateColumns }}
      onChange={handleChange}
    >
      {range(numOfPeople).map((personIndex) => (
        <Input
          className={`w-full font-bold ${personIndex === 0 ? 'col-start-1 sm:col-start-4' : ''}`}
          key={personIndex}
          placeholder="Name"
          onChange={(event) => updatePeoplesNames(personIndex, event.target.value)}
        />
      ))}
      {receiptItems.map(([item, price], itemIndex) => (
        <Fragment key={`${item}-${itemIndex}`}>
          <p className="self-center col-start-1">{item}</p>
          <p className="self-center">{poundFormatter.format(price)}</p>
          <Input
            className="self-center w-full"
            name={`discount-${itemIndex}`}
            placeholder="discount"
            {...defaultPriceInputProps}
          />
          {range(numOfPeople).map((personIndex) => (
            <Input
              className={`self-center w-full ${
                personIndex === 0 ? 'col-start-1' : ''
              } sm:col-start-auto`}
              key={personIndex}
              name={`share-${itemIndex}-${personIndex}`}
              placeholder={peopleNames[personIndex] || 'share'}
              {...defaultNaturalNumberInputProps}
            />
          ))}
        </Fragment>
      ))}
      {priceSummary?.map((price, personIndex) => (
        <p className={personIndex === 0 ? 'col-start-1 sm:col-start-4' : ''} key={personIndex}>
          {poundFormatter.format(price)}
        </p>
      ))}
    </form>
  );
};
