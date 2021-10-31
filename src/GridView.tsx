import type { ReactElement } from 'react';

import { MainTableArray } from 'components/MainTableArray';

import { InitialsInputsArray } from './components/InitialsInputsArray';
import { PeopleTotals } from './components/PeopleTotals';
import { useFocusInput } from './hooks/useFocusInput';
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns';
import { useTrackFocus } from './hooks/useTrackFocus';
import { useUpdateUrl } from './hooks/useUpdateUrl';
import {
  calculateDiscount,
  calculateServiceChargeFraction,
  calculateTotal,
  poundFormatter,
  sumPricesByPerson,
} from './utils/money';
import { splitItems } from './utils/receipt';
import { sum } from './utils/utils';
import type { FormikFormState } from './types';

interface GridViewProperties {
  values: FormikFormState;
}

export function GridView({ values }: GridViewProperties): ReactElement {
  const { receiptItems, numberOfPeople, peoplesInitials, serviceCharge } = values;

  // Handle keyboard navigation
  const [focus, setFocus] = useTrackFocus(
    receiptItems.length * (numberOfPeople + 1) + numberOfPeople,
    numberOfPeople + 1,
  );
  useFocusInput(focus, numberOfPeople);

  useUpdateUrl(values);

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
        {poundFormatter.format(
          sum(receiptItems.map(({ price, discount }) => calculateDiscount(discount, price))),
        )}
      </b>

      <PeopleTotals
        labels={peoplesInitials}
        priceSummary={sumPricesByPerson(splitItems(values))}
        serviceChargeFraction={calculateServiceChargeFraction(serviceCharge)}
        total={calculateTotal(receiptItems)}
      />
    </div>
  );
}
