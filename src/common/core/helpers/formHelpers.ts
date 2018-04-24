// tslint:disable-next-line:export-name
export const equalityThoughInputPattern = (str: string) => {
  return str.replace(/[.?*+^$[\]\\(){}|]/g, '\\$&');
};
