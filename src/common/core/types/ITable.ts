export type ITableDataItem = {
  [ field: string ]: any,
};

export type ITableData = ITableDataItem[];

// tslint:disable-next-line no-stateless-class
export class TableCurrency {}

export type TTableFieldDescriptor = StringConstructor |
                                    NumberConstructor |
                                    BooleanConstructor |
                                    ObjectConstructor |
                                    TableCurrency |
                                    DateConstructor;

export type TTableCustomFormatter = (
  value: string,
  field: ITableFieldMetaData,
  row: ITableDataItem,
  fields: ITableFields,
) => string;

export type TComparableDataFieldValue = string | number | boolean | object | Date;

export type TTableFieldSortAsDescriptor = TTableFieldDescriptor | void; // void signal to use fieldType-based sorting

export type TTableFieldPrecisionFactory =
  (row: ITableDataItem, fields: ITableFields, field: ITableFieldMetaData) => number;

export interface ICurrencyFormatterOptons {
  code?: string;
  codeFieldName?: string;
  codeFieldValueExtract?: RegExp;
}

export interface ITableFieldMetaData {
  fieldName: string;
  formatter?: TTableCustomFormatter;
  sortKey?: string;
  label?: string;
  fieldType?: TTableFieldDescriptor;
  fieldTypeFormatterOptions?: ICurrencyFormatterOptons;
  precision?: number | TTableFieldPrecisionFactory;
  pick?: string;
  sortAs?: TTableFieldSortAsDescriptor;
}

export type ITableFields = ITableFieldMetaData[];

export interface IReadOnlyTable {
  fields: ITableFields;
  data: ITableData;
}

// A reusable example of 'label' data extracting from object data table
export const pickLabelOptions = {
  fieldType: Object,
  pick: 'label',
};

export type TRawColumn = {
  col: string;
  label: string;
  // tslint:disable-next-line no-reserved-keywords
  type: string;
};
