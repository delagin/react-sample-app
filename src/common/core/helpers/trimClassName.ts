export const trimClassName = (className: string | void): string =>
  String(className || '').replace(/\s+/g, ' ').trim();
