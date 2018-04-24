import { List } from 'immutable';
import * as React from 'react';

import { AppReadOnlyTablePanel } from '@app/components/AppComponents';
import { AppOverviewPanelUpdateButton } from '@app/components/AppOverviewPanel';
import { TAxmitTableLayout } from '@common/components';
import { AxmitWebSocket } from '@common/core/services';
import { ITableData, ITableFieldMetaData } from '@common/core/types';

export interface IAppOverviewTableAPI {
  invalidate(): void;
}

export interface IAppOverviewTableCommonProps {
  apiRef?(api: IAppOverviewTableAPI): void;
}

interface IAppOverviewTableProps {
  title: string;
  fields: ITableFieldMetaData[];
  fetchingService: string;
  fetchingMethod: string;
  tableLayout?: TAxmitTableLayout;
}

type TProps = IAppOverviewTableCommonProps & IAppOverviewTableProps;

interface IState {
  data: ITableData;
  outdated: boolean;
}

export class AppOverviewTable extends React.Component<TProps, IState> {
  public state: IState = {
    data: [],
    outdated: false,
  };

  public api: IAppOverviewTableAPI = {
    invalidate: () => this.setState({ outdated: true }),
  };

  private fields: List<ITableFieldMetaData>;

  public constructor(props: TProps) {
    super(props);
    this.updateProps(props);
  }

  public componentDidMount() {
    const { apiRef } = this.props;
    if (apiRef) {
      apiRef(this.api);
    }
  }

  public componentWillReceiveProps(nextProps: TProps) {
    this.updateProps(nextProps);
  }

  public async componentWillMount() {
    await this.fetchData();
  }

  public render() {
    const { data, outdated } = this.state;
    const { title, tableLayout } = this.props;

    return (
      <AppReadOnlyTablePanel
        title={title}
        tableLayout={tableLayout}
        titleAppend={(
          <AppOverviewPanelUpdateButton
            outdated={outdated}
            onClick={this.onUpdateClick}
          />
        )}
        table={{
          data,
          fields: this.fields.toArray(),
        }}
      />
    );
  }

  private updateProps({ fields }: TProps) {
    this.fields = List<ITableFieldMetaData>(fields);
  }

  private onUpdateClick = () => {
    this.fetchData();
  }

  private async fetchData() {
    const { fetchingService, fetchingMethod } = this.props;

    try {
      const { items } = await AxmitWebSocket.invoke<{ items: ITableData }>(
        fetchingService,
        fetchingMethod,
      );

      this.setState({ data: items, outdated: false });

    } catch (err) {
      console.error('error on fetch table data:', err);
    }
  }
}
