import { ImageFile } from 'react-dropzone';

import { humanizeBytes } from '@common/components/Dropzone/helpers';

export const fileSizeMismatch = (file: ImageFile, maxSize: number): string | false => {
  const fileSize = file.size;

  if (fileSize < maxSize) {
    return false;
  }

  return `File size is greater than allowed ${humanizeBytes(maxSize)} bytes`;
};
