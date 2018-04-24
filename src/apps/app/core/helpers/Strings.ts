export const trunc = (str: string, length: number): string => {
  return (str.length > length) ? `${str.substr(0, length - 1)} ...` : str;
};

let helperDiv: HTMLDivElement;

const getHelperDiv = (): HTMLDivElement => {
  if (!helperDiv) {
    helperDiv = document.createElement('div');
  }

  return helperDiv;
};

export const removeTags = (str: string): string => {
  const div = getHelperDiv();
  // tslint:disable-next-line:no-inner-html
  div.innerHTML = str;
  const cleanStr = div.textContent || div.innerText || '';
  // tslint:disable-next-line:no-inner-html
  div.innerHTML = '';

  return cleanStr;
};
