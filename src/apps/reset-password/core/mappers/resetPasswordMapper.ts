interface IResetPasswordData {
  forgot_pwd: string;
  forgot_confirm: string;
  forgot_hash: string;
  forgot_email: string;
}

export type TResetPasswordData = {
  password: string;
  passwordConfirmation: string;
  email: string;
  hash: string;
};

export const resetPasswordMapTo = (data: TResetPasswordData): IResetPasswordData => {
  return {
    forgot_pwd: data.password,
    forgot_confirm: data.passwordConfirmation,
    forgot_hash: data.hash,
    forgot_email: data.email,
  };
};
