import type { ReactElement, ReactNode } from 'react';

import { Form, Formik } from 'formik';

import type { AppFormikProperties, FormikFormState } from '../types';
import { divideReceipt } from '../utils/receipt';
import { decompressDecode, deminify } from '../utils/serialisation';

export interface FormWrapperProperties {
  children: (properties: AppFormikProperties) => ReactNode;
}

const testReceipt = `Root Ginger Loose £1.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags £1.50
Pesto & Goat Cheese Tortelloni 300g £1.50
`;

const initNumberOfPeople = 3;
const initialValues: FormikFormState = {
  receipt: testReceipt,
  numberOfPeople: initNumberOfPeople,
  serviceCharge: '0',
  peoplesInitials: Array.from({ length: initNumberOfPeople }).fill('') as string[],
  receiptItems: divideReceipt(testReceipt).map((receiptItem) => ({
    ...receiptItem,
    shares: Array.from({ length: initNumberOfPeople }).fill('') as string[],
    discount: '',
  })),
};

export function FormWrapper({ children }: FormWrapperProperties): ReactElement {
  let parsedFormikState: FormikFormState | undefined;
  try {
    const paths = window.location.search;

    // Remove the '?' at the start
    const urlValues = decompressDecode(paths.slice(1));

    parsedFormikState = urlValues !== undefined ? deminify(urlValues) : undefined;
  } catch (error) {
    console.error(error);
    parsedFormikState = undefined;
  }

  return (
    <Formik initialValues={parsedFormikState ?? initialValues} onSubmit={() => {}}>
      {(properties) => <Form>{children(properties)}</Form>}
    </Formik>
  );
}
