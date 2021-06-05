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

const testReceipt = `Root Ginger Loose £1.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags £1.50
Pesto & Goat Cheese Tortelloni 300g £1.50
`;

export const MainView = () => {
  const [source, setSource] = useState(testReceipt);
  const [numOfPeople, setNumOfPeople] = useState(3);

  const receiptItems = divideReceipt(source);

  return (
    <main className="py-4">
      <textarea
        className="w-full self-center shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      <GridView numOfPeople={numOfPeople} receiptItems={receiptItems} />
    </main>
  );
};
