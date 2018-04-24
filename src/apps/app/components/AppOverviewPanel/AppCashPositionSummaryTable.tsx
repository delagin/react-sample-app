import * as React from 'react';

import { AppOverviewTable, IAppOverviewTableCommonProps } from '@app/components/AppOverviewPanel';
import { TableCurrency } from '@common/core/types';

export const AppCashPositionSummaryTable = (props: IAppOverviewTableCommonProps) => (
  <AppOverviewTable
    apiRef={props.apiRef}
    title='Cash Position Summary'
    fields={[
      { label: 'Account', fieldName: 'account_name' },
      { label: 'CCY', fieldName: 'ccy' },
      { label: 'Total Cash', fieldName: 'local', fieldType: TableCurrency },
    ]}
    fetchingService='client_control'
    fetchingMethod='load_client_settlement_cash_group'
  />
);
