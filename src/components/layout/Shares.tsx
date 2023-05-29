import type { ReactElement } from 'react';

import { useFocusInput } from '../../hooks/useFocusInput';
import { useGridTemplateColumns } from '../../hooks/useGridTemplateColumns';
import { useTrackFocus } from '../../hooks/useTrackFocus';
import { useUpdateUrl } from '../../hooks/useUpdateUrl';
import type { FormikFormState } from '../../types';
import {
  calculatePercentDiscountFraction,
  calculatePostDiscountTotal,
  calculateTotal,
  poundFormatter,
  sumPricesByPerson,
} from '../../utils/money';
import { splitItems } from '../../utils/receipt';
import { InitialsInputsArray } from '../InitialsInputsArray';
import { MainTableArray } from '../MainTableArray';
import { PeopleTotals } from '../PeopleTotals';

export interface SharesProperties {
  values: FormikFormState;
}

export function Shares({ values }: SharesProperties): ReactElement {
  const { receiptItems, numberOfPeople, peoplesInitials, percentageMultiplier } = values;

  // Handle keyboard navigation
  const [focus, setFocus] = useTrackFocus(
    receiptItems.length * (numberOfPeople + 1) + numberOfPeople,
    numberOfPeople + 1,
  );
  useFocusInput(focus, numberOfPeople);

  useUpdateUrl(values);

  const sharesByPerson = sumPricesByPerson(splitItems(values));
  const itemsTotal = calculateTotal(receiptItems);

  return (
    <div className="grid gap-4 my-5" style={useGridTemplateColumns(numberOfPeople)}>
      <InitialsInputsArray
        peoplesInitials={peoplesInitials}
        onClick={(inputIndex) => setFocus(inputIndex)}
      />

      {receiptItems.length > 0 ? (
        <MainTableArray
          focus={focus}
          numberOfPeople={numberOfPeople}
          peoplesInitials={peoplesInitials}
          receiptItems={receiptItems}
          onClick={(inputIndex) => setFocus(inputIndex)}
        />
      ) : (
        <p className="col-span-full">You have no receipt items to display.</p>
      )}

      <b>Total:</b>

      <b className="col-start-2">
        {poundFormatter.format(calculatePostDiscountTotal(receiptItems))}
      </b>

      <PeopleTotals
        labels={peoplesInitials}
        percentageMultiplierFraction={calculatePercentDiscountFraction(percentageMultiplier)}
        priceSummary={sharesByPerson}
        total={itemsTotal}
      />
    </div>
  );
}
