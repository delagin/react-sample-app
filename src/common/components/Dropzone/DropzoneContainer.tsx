import * as React from 'react';
import { ImageFile } from 'react-dropzone';

import { IAxmitNativeFormAPI } from '@common/components/AxmitForms';
import { Dropzone, IDocument } from '@common/components/Dropzone';
import { fileExtensionMismatch, fileSizeMismatch } from '@common/components/Dropzone/helpers';
import { uploadDocument } from '@common/core/services/DocumentUpload';

interface IDropzoneContainerProps {
  filename: string;
  maxSize?: number;
  accept?: string[];
  formLabel?: React.ReactNode;
  required?: boolean;
  formApi?: IAxmitNativeFormAPI;
  field?: string;
  onFileUpload?(file: IDocument): void;
  notifyError(errorMessage: string): void;
}

interface IDropzoneContainerState {
  file?: IDocument;
  uploading?: boolean;
}

const DEFAULT_ACCEPT_FILES: string[] = [
  // Here we use extensions instead of MIME types to fix
  // accepting of PDF files on iOS devices
  '.pdf',
  '.png',
  '.jpeg',
  '.jpg',
];

const DEFAULT_MAX_FILE_SIZE = 1024 * 1024 * 5;

export class DropzoneContainer extends
  React.Component<IDropzoneContainerProps, IDropzoneContainerState> {
  public state: IDropzoneContainerState = {};

  // Autoextract file from AxmitNativeForm
  public componentWillReceiveProps(newProps: IDropzoneContainerProps) {
    this.props = newProps;

    const { formApi, field }  = newProps;

    if (formApi && field) {
      const file = formApi.value(field) as IDocument;
      if (file && file !== this.state.file) {
        this.setState({ file });
      }
    }
  }

  public render() {
    const { maxSize, accept, formLabel, formApi, field, required, filename } = this.props;
    const { file, uploading } = this.state;

    return (
      <Dropzone
        maxSize={maxSize || DEFAULT_MAX_FILE_SIZE}
        accept={accept || DEFAULT_ACCEPT_FILES}
        file={file}
        formLabel={formLabel}
        uploading={uploading}
        formApi={formApi}
        field={field || filename}
        required={required}
        onFilesDrop={this.onFilesDrop}
        onDropFilesDropRejected={this.onDropFilesDropRejected}
      />
    );
  }

  private onFilesDrop = async (accepted?: ImageFile[]) => {
    if (!accepted || accepted.length === 0) {
      return;
    }

    const { onFileUpload, field, formApi, notifyError } = this.props;

    this.setState({ uploading: true });

    try {
      const [uploadingFile] = accepted;
      const file = await uploadDocument(this.props.filename, uploadingFile);

      this.setState({ file });

      if (onFileUpload) {
        onFileUpload(file);
      }

      if (formApi && field) {
        formApi.setValue(field, file, true);
      }
    } catch (err) {
      notifyError(err.message || String(err));
    }

    this.setState({ uploading: false });
  }

  private onDropFilesDropRejected = (rejected: ImageFile[]) => {
    const accept = this.props.accept || DEFAULT_ACCEPT_FILES;
    const maxSize = this.props.maxSize || DEFAULT_MAX_FILE_SIZE;

    const errors = rejected.map((file) => {
      // Check for file extension mismatch
      const fileExtError = fileExtensionMismatch(file, accept);
      if (fileExtError) {
        return fileExtError;
      }

      // Check for file size mismatch
      const fileSizeError = fileSizeMismatch(file, maxSize);
      if (fileSizeError) {
        return fileSizeError;
      }

      // Generate other unknown rejection reason to be not silent
      return 'This file is not allowed to upload by unknown reason';
    });

    errors.forEach(error =>
      this.props.notifyError(error),
    );
  }
}
