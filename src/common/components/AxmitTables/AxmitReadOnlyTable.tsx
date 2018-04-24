import * as React from 'react';
import { Table } from 'reactstrap';

import '@common/styles/components/axmit-table.sass';

import { AxmitSortingTableTriangle } from '@common/components/AxmitTables';
import { formatFieldValue } from '@common/core/helpers';
import { IReadOnlyTable, ITableFieldMetaData } from '@common/core/types';

export type TAxmitTableLayout = 'auto' | 'fixed';

interface IAxmitReadOnlyTableProps {
  table: IReadOnlyTable;
  tableLayout?: TAxmitTableLayout;
  sortBy?: string;
  sortAsc?: boolean;
  onLabelClick?(field: ITableFieldMetaData): void;
  onRowClick?(rowData: Object): void;
}

/**
 * AxmitReadOnlyTable render IReadOnlyTable structure using own style
 */
export const AxmitReadOnlyTable: React.StatelessComponent<IAxmitReadOnlyTableProps> = ({
  table: {
    fields,
    data,
  },
  sortBy,
  sortAsc,
  onLabelClick,
  onRowClick,
  tableLayout = 'fixed',
}) => (
  <Table
    className={`axmit-table axmit-table--ro axmit-table--layout-${tableLayout}`}
    hover={true}
    size='sm'
  >
    <thead>
      <tr>
        {fields.map((field, key) => (
          <th
            key={key}
            onClick={onLabelClick && onLabelClick.bind(null, field)}
            className={`
              axmit-table__th
              ${field.sortKey && 'axmit-table__th--sortable'}
            `}
          >
            {field.label || field.fieldName}
            {field.sortKey && (
              <AxmitSortingTableTriangle
                active={sortBy === field.sortKey}
                asc={sortBy === field.sortKey && sortAsc || false}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {data.map((item, itemKey) => (
        <tr
          key={itemKey}
          className={`${onRowClick && 'axmit-table__tr--clickable' || ''}`}
          onClick={onRowClick && onRowClick.bind(null, item)}
        >
          {fields.map((field, key) => (
            <td key={key} className='axmit-table__td'>
              {formatFieldValue(field, item[field.fieldName], item, fields)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);
