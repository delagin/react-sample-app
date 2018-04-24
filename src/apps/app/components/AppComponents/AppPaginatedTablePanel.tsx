import { List } from 'immutable';
import * as React from 'react';

import { AppReadOnlyTablePanel } from '@app/components/AppComponents';
import { TAxmitTableLayout } from '@common/components';
import { AxmitWebSocket } from '@common/core/services';
import { ITableData, ITableFieldMetaData } from '@common/core/types';

export type TSearchCriteria = {
  [key: string]: any;
};

export type TTableDataMap = (items: ITableDataResponse) => ITableDataResponse | Promise<ITableDataResponse>;

export interface IAppPaginatedTablePanelProps {
  title?: string;
  titleAppend?: React.ReactNode;
  tableLayout?: TAxmitTableLayout;
  rowsPerPage: number;
  fields: List<ITableFieldMetaData>;
  model?: string;
  rpcService?: string;
  rpcMethod?: string;
  sortable?: boolean;
  initialSortBy?: string;
  initialSortAsc?: boolean;
  sortingInCriteria?: boolean;
  criteria?: TSearchCriteria;
  mapData?: TTableDataMap;
  requestData?(props: IAppPaginatedTablePanelProps, state: IState): any;
  onRowClick?(rowData: Object): void;
}

export interface IAppPaginatedTablePanelAPI {
  refresh(): void;
}

interface IAppPaginatedTablePanelOwnProps {
  apiRef?(formApi: IAppPaginatedTablePanelAPI): void;
}

type AppPaginatedTablePanelProps = IAppPaginatedTablePanelProps & IAppPaginatedTablePanelOwnProps;

interface IState {
  data: ITableData;
  page: number;
  pages: number;
  loading: boolean;
  sortBy: string;
  sortAsc: boolean;
}

interface ITableDataResponse {
  items: ITableData;
  count: number;
}

export class AppPaginatedTablePanel extends React.Component<AppPaginatedTablePanelProps, IState> {
  public requestData: any;

  public api: IAppPaginatedTablePanelAPI = {
    refresh: () => this.fetchData(this.state.page, this.state.sortBy, this.state.sortAsc),
  };

  private rpcService = 'client_control';
  private rpcMethod = 'genoa_list';

  constructor(props: AppPaginatedTablePanelProps) {
    super(props);

    const { initialSortAsc, initialSortBy } = props;

    this.state = {
      data: [],
      page: 1,
      pages: 1,
      loading: false,
      sortBy: initialSortBy || 'id',
      sortAsc: initialSortAsc || false,
    };
  }

  public async componentWillMount() {
    await this.onSetPage(1);
  }

  public componentDidMount() {
    const { apiRef } = this.props;
    if (apiRef) {
      apiRef(this.api);
    }
  }

  public async componentWillUpdate(nextProps: IAppPaginatedTablePanelProps) {
    const { criteria } = this.props;

    if (JSON.stringify(nextProps.criteria || {}) !== JSON.stringify(criteria || {})) {
      this.props = nextProps;
      await this.onSetPage(this.state.page);
    }
  }

  public render() {
    const { title, fields, onRowClick, sortable, titleAppend, tableLayout } = this.props;
    const { data, page, pages, loading, sortBy, sortAsc } = this.state;

    const rest: any = {};
    if (sortable !== false) {
      rest.onSortSet = this.onSortSet;
    }

    return (
      <AppReadOnlyTablePanel
        title={title}
        titleAppend={titleAppend}
        table={{
          data,
          fields: fields.toArray(),
        }}
        tableLayout={tableLayout}
        sortBy={sortBy}
        sortAsc={sortAsc}
        page={page}
        pages={pages}
        onSetPage={this.onSetPage}
        loading={loading}
        onRowClick={onRowClick}
        {...rest}
      />
    );
  }

  private onSortSet = async (sortBy: string, sortAsc: boolean) =>
    this.fetchData(this.state.page, sortBy, sortAsc)

  private onSetPage = async (page: number) =>
    this.fetchData(page, this.state.sortBy, this.state.sortAsc)

  private async fetchData(page: number, sortBy: string, sortAsc: boolean) {
    const { rowsPerPage: limit, model, rpcService, rpcMethod, sortable, sortingInCriteria, mapData } = this.props;
    const offset = limit * (page - 1);

    try {
      this.setState({ loading: true });

      const criteria = this.props.criteria != null ?
                        this.props.criteria :
                        {};

      const orderBy = sortable !== false ?
                        [sortBy, sortAsc] :
                        void 0;

      const requestData = this.props.requestData ?
                          this.props.requestData(this.props, this.state) :
                          void 0;

      let response = await AxmitWebSocket.invoke<ITableDataResponse>(
        rpcService || this.rpcService,
        rpcMethod || this.rpcMethod,
        {
          limit,
          offset,
          model,
          order_by: !sortingInCriteria ? orderBy : void 0,
          ...requestData,
          criteria: {
            ...criteria,
            ...(sortingInCriteria && { order_by: orderBy }),
          },
        },
      );

      if (mapData) {
        response = await mapData(response);
      }

      const { items: data, count } = response;

      this.setState({
        page,
        sortBy,
        sortAsc,
        data,
        loading: false,
        pages: Math.ceil(count / limit),
      });

    } catch (err) {
      console.error('error on fetch table data:', err);
    }
  }
}
