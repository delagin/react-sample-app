import * as React from 'react';

import { AppPanel, AppPanelSeparator } from '@app/components/AppComponents';
import { AppTitle } from '@common/components/AppTitle';

import {
  AppAccountReservationTable,
  AppCashPositionSummaryTable,
  AppEquityPositionSummaryTable,
  AppOrderSummaryTable,
  IAppOverviewTableAPI,
} from '@app/components/AppOverviewPanel';
import { AxmitWebSocket } from '@common/core/services';

export class AppOverviewPanel extends React.Component {
  private static INVALIDATE_SIGNALS = [
    'client_registration_service:peer:saved_Transfer',
    'client_registration_service:peer:saved_CashTransferRequest',
    'client_registration_service:peer:balance_update',
    'client_registration_service:peer:saved_Order',
    'client_registration_service:peer:saved_Trade',
  ];

  private tableAPIs: IAppOverviewTableAPI[] = [];

  public async componentDidMount() {
    AxmitWebSocket.subscribeSignals(AppOverviewPanel.INVALIDATE_SIGNALS, this.invalidateTableActuality);
  }

  public async componentWillUnmount() {
    AxmitWebSocket.unsubscribeSignals(AppOverviewPanel.INVALIDATE_SIGNALS, this.invalidateTableActuality);
  }

  public render() {
    return (
      <AppPanel>
        <AppTitle append='Overview'>
          <AppCashPositionSummaryTable apiRef={this.addTableRef} />

          <AppPanelSeparator />

          <AppEquityPositionSummaryTable apiRef={this.addTableRef} />

          <AppPanelSeparator />

          <AppAccountReservationTable apiRef={this.addTableRef} />

          <AppPanelSeparator />

          <AppOrderSummaryTable apiRef={this.addTableRef} />
        </AppTitle>
      </AppPanel>
    );
  }

  private invalidateTableActuality = () => {
    this.tableAPIs.forEach((tableAPI) => {
      tableAPI.invalidate();
    });
  }

  private addTableRef = (tableAPI: IAppOverviewTableAPI) => {
    this.tableAPIs.push(tableAPI);
  }
}
