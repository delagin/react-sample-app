import { getCookie, WebServer } from '@common/core/services';
import { loginMapperMapTo, TLoginData } from '@login/core/mappers';

class LoginError extends Error {
  public message: string;
  public requireTFA: boolean;

  constructor(message: string, isRequireTFA: boolean) {
    super(message);

    this.message = message;
    this.requireTFA = isRequireTFA;
  }
}

export const login = async (loginData: TLoginData): Promise<void> => {
  let data: any = null;

  try {
    const response = await WebServer.post(
      '/loginj',
      loginMapperMapTo(loginData),
      {
        headers: { 'X-Xsrftoken': getCookie('_xsrf') },
      },
    );
    data = response.data;
  } catch (error) {
    throw new LoginError(error, false);
  }

  if (data.error) {
    throw new LoginError(data.error, false);
  }
};
