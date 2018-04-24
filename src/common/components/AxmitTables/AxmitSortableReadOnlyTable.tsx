import * as React from 'react';

import { AxmitReadOnlyTable, TAxmitTableLayout } from '@common/components/AxmitTables';
import {
  createNewDate,
  fixNumberValue,
  sortTableData,
} from '@common/core/helpers';
import {
  IReadOnlyTable,
  ITableData,
  ITableFieldMetaData,
  TableCurrency,
  TTableFieldDescriptor,
} from '@common/core/types';

type TSortValueParser = TTableFieldDescriptor | typeof fixNumberValue | typeof createNewDate;

export interface IAxmitSortableReadOnlyTableProps {
  table: IReadOnlyTable;
  tableLayout?: TAxmitTableLayout;
  sortBy?: string;
  sortAsc?: boolean;
  onSortSet?(sortBy: string, sortAsc: boolean): void;
  onRowClick?(rowData: Object): void;
}

interface IAxmitSortableReadOnlyTableState {
  sortBy?: string;
  sortAsc?: boolean;
  sortValueParser: TSortValueParser;
  data: ITableData;
}

export class AxmitSortableReadOnlyTable extends React.Component<
  IAxmitSortableReadOnlyTableProps,
  IAxmitSortableReadOnlyTableState
  > {
  public state: IAxmitSortableReadOnlyTableState = {
    sortBy: void 0,
    sortAsc: void 0,
    sortValueParser: String,
    data: [],
  };

  public componentWillReceiveProps(nextProps: IAxmitSortableReadOnlyTableProps) {
    this.props = nextProps;

    if (!nextProps.onSortSet) {
      this.resortTableFromProps(nextProps);
    } else {
      this.renderTableAsIs(nextProps);
    }
  }

  public render() {
    const { sortBy, sortAsc, data } = this.state;
    const { table, onRowClick, tableLayout } = this.props;

    return (
      <AxmitReadOnlyTable
        table={{
          data,
          fields: table.fields,
        }}
        tableLayout={tableLayout}
        sortBy={sortBy}
        sortAsc={sortAsc}
        onLabelClick={this.onLabelClick}
        onRowClick={onRowClick}
      />
    );
  }

  private renderTableAsIs(props: IAxmitSortableReadOnlyTableProps) {
    const { sortBy, sortAsc, table } = props;

    this.setState({
      sortBy,
      sortAsc,
      data: table.data.slice(),
    });
  }

  private resortTableFromProps(props: IAxmitSortableReadOnlyTableProps) {
    const { fields } = props.table;

    const sortBy = this.state.sortBy ||
      props.sortBy ||
      (fields.length ? fields[0].sortKey : void 0);

    const sortAsc = this.state.sortAsc !== null ?
      this.state.sortAsc :
      props.sortAsc;

    this.resortTable(sortBy, sortAsc);
  }

  private onLabelClick = (field: ITableFieldMetaData) => {
    if (!field.sortKey) {
      return;
    }

    const { onSortSet } = this.props;

    const sortAsc = this.state.sortBy === field.sortKey ? !this.state.sortAsc : true;
    const sortBy = field.sortKey;

    if (onSortSet) {
      onSortSet(sortBy || '', sortAsc);
    } else {
      this.resortTable(sortBy, sortAsc);
    }
  }

  /**
   * Detect sorting table values and invoke re-rendering when it changed
   */
  private resortTable(sortBy?: string, sortAsc?: boolean) {
    const { table } = this.props;

    let sortValueParser: TSortValueParser = String;

    if (sortBy && table.fields.length) {
      table.fields.some((ff) => {
        if (ff.sortKey === sortBy) {
          switch (ff.sortAs) {
            case Date: sortValueParser = createNewDate; break;

            case TableCurrency:
            case Number: sortValueParser = fixNumberValue; break;

            default: {
              switch (ff.fieldType) {
                case TableCurrency:
                case Number: sortValueParser = fixNumberValue; break;

                default: sortValueParser = ff.fieldType || String;
              }
            }
          }

          return true;
        }

        return false;
      });
    }

    // console.time('sortData');
    const data = sortTableData(table.data, sortBy, Boolean(sortAsc), sortValueParser);
    // console.timeEnd('sortData');

    this.setState({ sortBy, sortValueParser, data, sortAsc });
  }
}
