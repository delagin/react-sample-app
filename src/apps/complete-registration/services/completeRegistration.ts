import { getCookie, WebServer } from '@common/core/services';
import { completeRegistrationMapTo, TCompleteRegistrationData } from '@complete-registration/mappers';

interface ICompleteRegistrationResponse {
  success?: object;
  confirm?: string; // confirm_email
  error?: string;
  message?: object;
  id?: string; // inner WS message id
}

export const completeRegistration = async (
  regData: TCompleteRegistrationData,
): Promise<ICompleteRegistrationResponse> => {
  const { data } = await WebServer.post(
    '/rj',
    completeRegistrationMapTo(regData),
    {
      headers: { 'X-Xsrftoken': getCookie('_xsrf') },
    },
  );

  if (data.error) {
    throw Error(data.error);
  }

  return data;
};
