import { GridView, ReceiptItem } from './GridView';
import { useState } from 'react';

const CURRENCY_SYMBOLS = ['£', '$', '€'];

const divideReceipt = (source: string): ReceiptItem[] => {
  const receiptItems: ReceiptItem[] = [];
  source.split('\n').map((line) => {
    for (const symbol of CURRENCY_SYMBOLS) {
      const [item, price] = line.split(symbol);

      price !== undefined && receiptItems.push([item, parseFloat(price)]);
    }
  });

  return receiptItems;
};

export const MainView = () => {
  const [source, setSource] = useState('');
  const [numOfPeople, setNumOfPeople] = useState(2);

  const receiptItems = divideReceipt(source);

  return (
    <main>
      <textarea
        className="w-full"
        placeholder="Paste or type your receipt here"
        value={source}
        onChange={(event) => setSource(event.target.value)}
      />
      <input
        min={2}
        placeholder="Number of People"
        type="number"
        value={numOfPeople}
        onChange={(event) => {
          const newValue = event.target.value;
          newValue && setNumOfPeople(parseFloat(newValue));
        }}
      />
      {/* {JSON.stringify(receiptItems)} */}
      <GridView numOfPeople={numOfPeople} receiptItems={receiptItems} />
    </main>
  );
};
