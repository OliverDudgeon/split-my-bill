import { divideReceipt } from './utils/receipt';
import type { FormikFormState } from './types';

export const testReceipt = `Root Ginger Loose £1.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags £1.50
Pesto & Goat Cheese Tortelloni 300g £1.50
`;

export const initNumberOfPeople = 3;
export const initialValues: FormikFormState = {
  receipt: testReceipt,
  numberOfPeople: initNumberOfPeople,
  percentDiscount: '0',
  peoplesInitials: Array.from({ length: initNumberOfPeople }).fill('') as string[],
  receiptItems: divideReceipt(testReceipt).map((receiptItem) => ({
    ...receiptItem,
    shares: Array.from({ length: initNumberOfPeople }).fill('') as string[],
    discount: '',
  })),
};
