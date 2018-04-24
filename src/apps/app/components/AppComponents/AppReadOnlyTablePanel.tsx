import * as React from 'react';
import { Col, Row } from 'reactstrap';

import {
  AxmitSortableReadOnlyTable,
  AxmitTablePagination,
  TAxmitTableLayout,
} from '@common/components';
import { IReadOnlyTable } from '@common/core/types';

interface IAppROTablePanelProps {
  // tslint:disable member-ordering

  title?: string | React.ReactNode;
  titleAppend?: React.ReactNode;
  headerAppend?: React.ReactNode;

  // Data src and manipulations
  table: IReadOnlyTable;
  tableLayout?: TAxmitTableLayout;
  sortBy?: string;
  sortAsc?: boolean;
  onSortSet?(sortBy: string, sortAsc: boolean): void;

  // Table state
  loading?: boolean;

  // Pagination
  page?: number;
  pages?: number;
  onSetPage?(page: number): void;

  onRowClick?(rowData: Object): void;
  // tslint:enable member-ordering
}

export const AppReadOnlyTablePanel: React.StatelessComponent<IAppROTablePanelProps> = ({
  title,
  titleAppend: TitleAppend,
  headerAppend: HeaderAppend,
  table,
  tableLayout,
  sortBy,
  sortAsc,
  onSortSet,
  page,
  pages,
  onRowClick,
  onSetPage,
  loading,
}) => (
  <div>
    {(title != null || TitleAppend != null) && (
      <Row tag='header' className='bs-table__header'>
        <Col>
          {title && (
            <h2 className='mb-0 mt-1'>{title}</h2>
          )}
        </Col>

        {TitleAppend && (
          <Col className='col-auto'>
            {TitleAppend}
          </Col>
        )}
      </Row>
    )}

    <Row>
      <Col>
        {HeaderAppend}
      </Col>
    </Row>

    <Row>
      <Col>
        <AxmitSortableReadOnlyTable
          table={table}
          tableLayout={tableLayout}
          sortBy={sortBy}
          sortAsc={sortAsc}
          onSortSet={onSortSet}
          onRowClick={onRowClick}
        />
      </Col>
    </Row>

    {page != null && pages != null && pages >= 1 && onSetPage != null && (
      <AxmitTablePagination
        page={page}
        pages={pages}
        onSetPage={onSetPage}
        disableInputs={loading}
      />
    )}
  </div>
);
