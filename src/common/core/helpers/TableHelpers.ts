import {
  ITableData,
  ITableDataItem,
  ITableFieldMetaData,
  ITableFields,
  TableCurrency,
  TComparableDataFieldValue,
  TSortCompareResult,
  TTableCustomFormatter,
  TTableFieldDescriptor,
} from '@common/core/types';

import { CurrencyFormatter, fixNumberValue, fixNumberValueString } from '@common/core/helpers';

// Wrapper for newDate constructor.
// NOTE: can be memoized
export const createNewDate = (value: any): Date =>
  new Date(value);

// Pick value by key from plain Object
export const pickValue = (field: ITableFieldMetaData, value: object): string => {
  const { pick } = field;

  if (value == null) {
    return value;
  } else if (typeof value !== 'object') {
    return value;
  }

  if (pick == null) {
    throw new Error(`Pick#extract cannot get field#pick`);
  }

  const valueObj: any = value;

  return valueObj[pick];
};

/**
 * Format field value according to (field.fieldType | String) to show
 * @param field field description from table
 * @param value raw field value from backend
 */
export const formatFieldValue = (
  field: ITableFieldMetaData,
  value: any,
  row: ITableDataItem,
  fields: ITableFields,
): string => {
  const FieldTypeConstructor: TTableFieldDescriptor = field.fieldType || String;
  const customFormatter: TTableCustomFormatter | void = field.formatter;

  if (customFormatter != null) {
    return customFormatter(value, field, row, fields);
  }

  switch (FieldTypeConstructor) {
    case Date:
      return new Date(value).toString();

    case Number: {
      const { precision } = field;
      if (typeof precision === 'number') {
        return fixNumberValue(value).toFixed(precision);
      } else if (typeof precision === 'function') {
        return fixNumberValue(value).toFixed(
          precision(row, fields, field),
        );
      } else {
        return fixNumberValue(value).toString();
      }
    }

    case Boolean:
      return Boolean(value) ? 'Yes' : 'No';

    case TableCurrency:
      return new CurrencyFormatter(fixNumberValueString(value), field, row, fields).toString();

    case Object:
      return pickValue(field, value);

    default:
    case String:
      return String(value || '');
  }
};

/**
 * Data sorting factory using some sorting options
 * @param data Initial table data
 * @param sortBy key of data to sort
 * @param sortAsc sorting order flag
 * @param sortAs factory function which converts values to sort-applicable format
 */
export const sortTableData = (
  data: ITableData,
  sortBy: string | void,
  sortAsc: boolean,
  sortValueParser: any = String,
): ITableData => {
  if (!data.length || !sortBy) {
    return data;
  }

  return sortBy == null ?
    data :
    (sortValueParser === String ?
      data.slice().sort((aa, bb) => compareString(
        sortValueParser(aa[sortBy]),
        sortValueParser(bb[sortBy]),
        sortAsc,
      )) :
      data.slice().sort(
        (aa, bb) => compareAnyTableValue(
            sortValueParser(aa[sortBy]),
            sortValueParser(bb[sortBy]),
            sortAsc,
          ),
      )
    );
};

/**
 * Universal comparator
 * @param valueA comparing first value
 * @param valueB comparing second value
 * @param sortAsc sorting order flag
 */
const compareAnyTableValue = (
  valueA: TComparableDataFieldValue,
  valueB: TComparableDataFieldValue,
  sortAsc: boolean,
): TSortCompareResult => {
  if (valueA === valueB) {
    return 0;
  } else if (valueA > valueB) {
    return sortAsc ? 1 : -1;
  } else if (valueA < valueB) {
    return sortAsc ? -1 : 1;
  }

  return 0;
};

/**
 * Strings comparator
 * @param valueA first compare string
 * @param valueB second compare string
 * @param sortAsc sorting order flag
 */
const compareString = (
  valueA: TComparableDataFieldValue,
  valueB: TComparableDataFieldValue,
  sortAsc: boolean,
): number => sortAsc ?
    valueA.toString().localeCompare(valueB.toString()) :
    valueB.toString().localeCompare(valueA.toString());
