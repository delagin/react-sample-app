import * as React from 'react';

import { AppOverviewTable, IAppOverviewTableCommonProps } from '@app/components/AppOverviewPanel';
import { TableCurrency } from '@common/core/types';

const isBLKRE = /BLK/i;

export const AppAccountReservationTable = (props: IAppOverviewTableCommonProps) => (
  <AppOverviewTable
    apiRef={props.apiRef}
    title='Account Reservation'
    tableLayout='auto'
    fields={[
      { label: 'Account', fieldName: 'account_name' },
      { label: 'Date', fieldName: 'order_date', sortAs: Date },
      { label: 'Time', fieldName: 'order_time', sortAs: Number },
      { label: 'Inst', fieldName: 'instrument' },
      {
        label: 'Qty',
        fieldName: 'quantity',
        fieldType: TableCurrency,
        sortAs: Number,
        precision: row => isBLKRE.test(String(row.instrument)) ? 0 : 2,
      },
      {
        label: 'Price',
        fieldName: 'price',
        fieldType: TableCurrency,
        precision: row => isBLKRE.test(String(row.instrument)) ? 6 : 2,
      },
      { label: 'Status', fieldName: 'order_status' },
    ]}
    fetchingService='client_control'
    fetchingMethod='load_client_open_orders'
  />
);
