import * as crypto from 'crypto';

// tslint:disable-next-line export-name
export const getRandomHashString = (size = 24): string =>
  crypto.randomBytes(256).toString('hex').slice(0, size).toUpperCase();
