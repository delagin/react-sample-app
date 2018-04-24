export type TCompleteRegistrationData = {
  password: string;
  passwordConfirmation: string;
  hash: string;
  email: string;
};

interface ICompleteRedistrationData {
  pwd: string;
  pwd_confirm: string;
  pwd_hash: string;
  pwd_email: string;
}

export const completeRegistrationMapTo = (data: TCompleteRegistrationData): ICompleteRedistrationData => {
  return {
    pwd: data.password,
    pwd_confirm: data.passwordConfirmation,
    pwd_hash: data.hash,
    pwd_email: data.email,
  };
};
