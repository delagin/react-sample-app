import { WebServer } from '@common/core/services';
import { IDocument } from '@common/core/types';

export const uploadDocument = async (fileFieldName: string, file: File): Promise<IDocument> => {
  const data = new FormData();
  data.append(fileFieldName, file);

  const response: any = await WebServer.post('/upload/', data);

  if (response.data) {
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    const path: string = response.data[fileFieldName] || '';

    if (!path) {
      throw new Error('Can\'t upload file');
    }

    return {
      file: path,
      label: path.replace(/\w+\//g, ''),
    };
  }

  throw new Error('Can\'t upload file');
};
