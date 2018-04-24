const CommaPeriodRE = /\d+\,\d+\.\d+/;

// Remove bad signs from values (like ',').
export const fixNumberValue = (value: any): number => {
  let fixed = String(value || '').replace(/[^\d\.\,\-]/g, '');

  if (CommaPeriodRE.test(fixed)) {
    fixed = fixed.replace(',', '');
  }

  return Number(fixed);
};

export const fixNumberValueString = (value: any): string =>
  fixNumberValue(value).toString();
