import * as React from 'react';
import { default as ReactDropzone, ImageFile } from 'react-dropzone';
import { Input } from 'reactstrap';

import { AxmitFormGroup, AxmitFormLabel, IAxmitNativeFormAPI } from '@common/components';
import { trimClassName } from '@common/core/helpers';
import { IDocument } from '@common/core/types';

export { ImageFile, IDocument };

interface IDropzoneProps {
  maxSize: number;
  accept: string[];
  file?: IDocument;
  formLabel?: React.ReactNode;
  uploading?: boolean;
  required?: boolean;
  formApi?: IAxmitNativeFormAPI;
  field?: string;
  onFilesDrop(acceptedFiles: ImageFile[], rejectedFiles: ImageFile[]): void;
  onDropFilesDropRejected(rejectedFiles: ImageFile[]): void;
}

const iconStateColor = (uploading?: boolean, uploaded?: boolean): string => {
  if (uploaded) {
    return 'text-success';
  } else if (uploading) {
    return 'text-info';
  }

  return 'text-muted';
};

export const Dropzone: React.StatelessComponent<IDropzoneProps> = ({
  file,
  maxSize,
  accept,
  required,
  formApi,
  field,
  uploading,
  formLabel,
  onFilesDrop,
  onDropFilesDropRejected,
}) => {
  const fileLabel = file ? file.label : void 0;

  if (required && (!formApi || !field)) {
    (console.error || console.log)(
      `'formApi' and 'field' properties should be provided to process this form input as required`,
    );
  }

  return (
    <AxmitFormGroup>
      <AxmitFormLabel>{formLabel}</AxmitFormLabel>

      {required && formApi && field && (
        <Input
          className='d-none'
          name={field}
          value={fileLabel || ''}
          required={true}
        />
      )}

      <ReactDropzone
        className={trimClassName(`
          react-dropzone__container d-flex
          ${file ? 'react-dropzone__container--selected' : ''}
        `)}
        acceptClassName='react-dropzone__container--accepted'
        rejectClassName='react-dropzone__container--rejected'
        onDrop={onFilesDrop}
        onDropRejected={onDropFilesDropRejected}
        multiple={false}
        maxSize={maxSize}
        accept={accept.join(',')}
      >
        <div className='d-flex-1 d-flex d-flex-row align-items-center'>
          <div className='d-flex-1 d-flex d-flex-row'>
            <div
              className={trimClassName(`
                react-dropzone__icon-container
                pl-4 pr-4
                ${iconStateColor(uploading, Boolean(file))}
              `)}
            >
              <span className='fa fa-plus fa-lg react-dropzone__icon-add'/>
              <span className='fa fa-file-text-o fa-4x'/>
            </div>

            <div className='react-dropzone__info-container d-flex-1 d-flex pr-4'>
              {uploading ? (
                <div className='d-flex-1'>Uploading File...</div>
              ) : (
                !fileLabel ? (
                  <div className='d-flex-1 d-flex flex-column justify-content-around'>
                    <div>
                      Drag & drop file
                      or <u>choose</u> to upload
                    </div>
                  </div>
                ) : (
                  <div className='d-flex-1 d-flex flex-column justify-content-around'>
                    <h4>{fileLabel}</h4>
                    <div>
                      Drag & drop file
                      or <u>choose</u> to update
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </ReactDropzone>
    </AxmitFormGroup>
  );
};
