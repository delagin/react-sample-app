import * as React from 'react';

import { AppOverviewTable, IAppOverviewTableCommonProps } from '@app/components/AppOverviewPanel';

export const AppEquityPositionSummaryTable = (props: IAppOverviewTableCommonProps) => (
  <AppOverviewTable
    apiRef={props.apiRef}
    title='Equity Position Summary'
    fields={[
      { label: 'Account', fieldName: 'account_name' },
      { label: 'Equity', fieldName: 'equity' },
      { label: 'Qty', fieldName: 'sum_quantity', fieldType: Number, precision: 0 },
    ]}
    fetchingService='client_control'
    fetchingMethod='load_client_exchange_positions_grouped'
  />
);
