import * as React from 'react';

interface IAxmitSortingTableTriangleProps {
  asc: boolean;
  active: boolean;
}

export const AxmitSortingTableTriangle = ({ asc, active }: IAxmitSortingTableTriangleProps) => (
  <span
    className={`
      ${active && 'axmit-table__sorting-triangle--active'}
      axmit-table__sorting-triangle
    `}
  >
    {asc ? <span> &#9650;</span> : <span> &#9660;</span>}
  </span>
);
