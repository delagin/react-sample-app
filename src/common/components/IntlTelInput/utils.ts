import AllCountries from 'react-intl-tel-input/src/components/AllCountries';

export interface ICountryData {
  areaCodes: null;
  dialCode: string;
  iso2: string;
  name: string;
  priority: number;
}

const foundCountries: { [ key: string ]: ICountryData } = {};

export const lookupCountryByName = (country: string): ICountryData | void => {
  const countryKey = country.toLocaleLowerCase();

  let countryData = foundCountries[ countryKey ];

  if (!countryData) {
    countryData = AllCountries.getCountries().find(
      (cd: ICountryData) =>
        cd.name.toLocaleLowerCase().indexOf(countryKey) >= 0,
    );

    if (countryData) {
      foundCountries[ countryKey ] = countryData;
    }
  }

  return countryData;
};
