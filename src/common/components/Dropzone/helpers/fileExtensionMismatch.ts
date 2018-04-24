import { ImageFile } from 'react-dropzone';

const FileExtRE = /\.[\w]{1,6}$/i;

export const fileExtensionMismatch = (file: ImageFile, accept: string[]): string | false => {
  const fileExtMatch = file.name.match(FileExtRE);
  const fileExt = fileExtMatch && fileExtMatch[0] && fileExtMatch[0].toLocaleLowerCase();
  const fileType = file.type;

  const extAllowed = accept.some(
    (acceptedFileTypeOrExt) => {
      const acceptedFileTypeOrExtLC = acceptedFileTypeOrExt.toLocaleLowerCase();

      return (acceptedFileTypeOrExtLC === fileExt) || (acceptedFileTypeOrExtLC === fileType);
    },
  );

  if (extAllowed) {
    return false;
  }

  const acceptedExtensions = accept.map(
    acceptedFileTypeOrExt => acceptedFileTypeOrExt.match(/\/\w/i),
  ).map(
    (acceptedFileTypeOrExtMatch, ii) => acceptedFileTypeOrExtMatch ? acceptedFileTypeOrExtMatch[0] : accept[ii],
  ).join(', ');

  const errorFileType = fileExt || fileType || file.name;

  return `File of type "${errorFileType}" is not allowed. Only ${acceptedExtensions} files can be uploaded`;
};
