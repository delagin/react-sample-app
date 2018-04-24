import { getCookie, WebServer } from '@common/core/services';
import { resetPasswordMapTo, TResetPasswordData } from '@reset-password/core/mappers';

interface IResetPasswordResponse {
  success?: object;
  confirm?: string; // confirm_email
  error?: string;
  message?: object;
  id?: string; // inner WS message id
}

export const resetPasswordServiceReset = async (formData: TResetPasswordData): Promise<IResetPasswordResponse> => {
  const { data } = await WebServer.post<IResetPasswordResponse>(
    '/rj',
    resetPasswordMapTo(formData),
    {
      headers: { 'X-Xsrftoken': getCookie('_xsrf') },
    },
  );

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};
