import {
  ITableFieldMetaData,
  TableCurrency,
  TRawColumn,
  TTableFieldDescriptor,
  TTableFieldSortAsDescriptor,
} from '@common/core/types';

/**
 * Mapper for raw data fields recieved from database with Genoa services
 * to inner field format for render
 *
 * Useful for dynamic tables rendering such Reports
 *
 * @param col given raw column from Genoa services
 */
export const mapColToField = (col: TRawColumn): ITableFieldMetaData => {
  let fieldType: TTableFieldDescriptor = String;
  let sortAs: TTableFieldSortAsDescriptor = void 0;

  const colLabel = String(col.label).toLowerCase();
  const colCol = String(col.col).toLowerCase();

  if (
    colLabel.indexOf('price') >= 0 ||
    colLabel.indexOf('amount') >= 0 ||
    colCol.indexOf('price') >= 0 ||
    colCol.indexOf('amount') >= 0
  ) {
    fieldType = TableCurrency;
    sortAs = Number;
  } else {
    switch (col.type) {
      case 'Numeric': fieldType = String; sortAs = Number; break;
      case 'Date': fieldType = String; sortAs = Date; break;
      case 'Boolean': fieldType = Boolean; break;

      default:
      case 'String': fieldType = String; break;
    }
  }

  return {
    sortAs,
    fieldType,
    sortKey: col.col,
    fieldName: col.col,
    label: col.label,
  };
};
