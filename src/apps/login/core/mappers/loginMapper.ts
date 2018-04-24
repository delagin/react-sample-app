
interface ILoginData {
  email: string;
  password: string;
}

export type TLoginData = {
  email: string;
  password: string;
};

export const loginMapperMapTo = (data: TLoginData): ILoginData => {
  const generalData = {
    email: data.email,
    password: data.password,
  };

  return {
    ...generalData,
  };
};
