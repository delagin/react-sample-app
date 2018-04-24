import { format as currencyFormatter } from 'currency-formatter';

import {
  ITableDataItem,
  ITableFieldMetaData,
  ITableFields,
} from '@common/core/types';

const DEFAULT_CURRENCY_CODE = 'EUR';

export interface ICurrencyFormatterOptions {
  code?: string;
  locale?: string;
  // tslint:disable-next-line no-reserved-keywords
  symbol?: string;
  decimal?: string;
  thousand?: string;
  precision?: number;
  format?: string | {
    pos: string;
    neg: string;
    zero: string;
  };
}

export class CurrencyFormatter {
  private value: number;
  private formatOptions: ICurrencyFormatterOptions;

  constructor (
    value: string,
    field: ITableFieldMetaData,
    row: ITableDataItem,
    fields: ITableFields,
  ) {
    const formatOptions: ICurrencyFormatterOptions = {};

    const { fieldTypeFormatterOptions, precision: fieldPrecision } = field;

    if (fieldTypeFormatterOptions) {
      const { code, codeFieldName, codeFieldValueExtract } = fieldTypeFormatterOptions;

      if (code) {
        formatOptions.code = code;
      } else if (codeFieldName) {
        const codeFieldMetaData = fields.find(
          ({ fieldName }) => fieldName === codeFieldName,
        );

        if (codeFieldMetaData) {
          const codeRawValue = row[codeFieldMetaData.fieldName];

          if (codeRawValue != null && typeof codeRawValue === 'string') {
            if (codeFieldValueExtract) {
              const extracted = codeRawValue.match(codeFieldValueExtract);
              formatOptions.code = extracted ? extracted[1] : codeRawValue;
            } else {
              formatOptions.code = codeRawValue;
            }
          }
        }
      }
    }

    if (typeof fieldPrecision === 'number') {
      formatOptions.precision = fieldPrecision;
    } else if (typeof fieldPrecision === 'function') {
      formatOptions.precision = fieldPrecision(row, fields, field);
    }

    this.value = Number(String(value || '0.0'));
    this.formatOptions = formatOptions;
  }

  public static format(
    value: number,
    options: ICurrencyFormatterOptions = {},
  ): string {
    return currencyFormatter(value, {
      symbol: options.code ? void 0 : '', // default symbol placeholder
      code: DEFAULT_CURRENCY_CODE,
      ...options,
    });
  }

  public toString(): string {
    return CurrencyFormatter.format(this.value, this.formatOptions);
  }
}
