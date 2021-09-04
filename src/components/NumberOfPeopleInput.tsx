import React from 'react';

import { FormikFormState, FormikSetter } from 'types';
import { resizeArrayRight } from 'utils/utils';

import { IncrementButton } from './IncrementButton';
import { Input } from './Input';

/**
 * Adjust the form state to have the number of "shares" fields specified from the "number of people" input
 */
const handleChangeToNumberOfPeople = (
  values: FormikFormState,
  setValues: FormikSetter<FormikFormState>,
  newNumberOfPeople: number,
) => {
  const newReceiptItems = values.receiptItems.map((receiptItem) => ({
    ...receiptItem,
    shares: resizeArrayRight(receiptItem.shares, newNumberOfPeople, ''),
  }));
  const newPeoplesInitials = resizeArrayRight(values.peoplesInitials, newNumberOfPeople, '');

  setValues({
    ...values,
    numberOfPeople: newNumberOfPeople,
    receiptItems: newReceiptItems,
    peoplesInitials: newPeoplesInitials,
  });
};

export interface NumberOfPeopleInputProperties {
  values: FormikFormState;
  setValues: (
    values: React.SetStateAction<FormikFormState>,
    shouldValidate?: boolean | undefined,
  ) => void;
}

export const NumberOfPeopleInput = ({
  values,
  setValues,
}: NumberOfPeopleInputProperties): JSX.Element => (
  <>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="number-of-people">Number of People</label>
    <IncrementButton
      side="left"
      onClick={() =>
        handleChangeToNumberOfPeople(values, setValues, Math.max(2, values.numberOfPeople - 1))
      }
    >
      -
    </IncrementButton>
    <Input disabled id="number-of-people" name="numberOfPeople" />
    <IncrementButton
      side="right"
      onClick={() => handleChangeToNumberOfPeople(values, setValues, values.numberOfPeople + 1)}
    >
      +
    </IncrementButton>
  </>
);
