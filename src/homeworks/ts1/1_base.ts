/**
 * Нужно превратить файл в ts и указать типы аргументов и типы возвращаемого значения
 * */
export const removePlus = (string: string): string => string.replace(/^\+/, '');

export const addPlus = (string: string): string => `+${string}`;

export const removeFirstZeros = (value: string): string => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

export const getBeautifulNumber = (value: number, separator = ' '): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const round = (value: number, accuracy = 2): number => {
  const d = 10 ** accuracy;
  return Math.round(value * d) / d;
};

const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

export type TGetTransformFromCssResponseValue = {
  x: number;
  y: number;
};

export const getTransformFromCss = (transformCssString: string): TGetTransformFromCssResponseValue => {
  const data = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

export type TColorContrast = number;
export const getColorContrastValue = (
  [red, green, blue]: TColorContrast[], // http://www.w3.org/TR/AERT#color-contrast
): number => Math.round((red * 299 + green * 587 + blue * 114) / 1000);

export const getContrastType = (contrastValue: number): string => (contrastValue > 125 ? 'black' : 'white');

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string) => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color: string): TColorContrast[] => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 8), 16);
  return [red, green, blue];
};
export type TNumberedArr = string;
export type TNumberedArrResponseValue = { value: string; number: number };
export const getNumberedArray = (arr: TNumberedArr[]): TNumberedArrResponseValue[] =>
  arr.map((value, number) => ({
    value,
    number,
  }));
export type TNumberedArrResponse = { value: string; number: number };
export const toStringArray = (arr: TNumberedArrResponse[]): string[] =>
  arr.map(({ value, number }) => `${value}_${number}`);
export type TBaseCustomer = {
  id: number;
  name: string;
  age: number;
  isSubscribed: boolean;
};
export type TCustomer = {
  [id: number]: Omit<TBaseCustomer, 'id'>;
};
export type TCustomerKeyV2 = number;
export type TCustomerValueV2 = Record<TCustomerKeyV2, Omit<TBaseCustomer, 'id'>>;
export const transformCustomers = (customers: TBaseCustomer[]): TCustomer | TCustomerValueV2 => {
  return customers.reduce<TCustomer | TCustomerValueV2>((acc, customer) => {
    acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
    return acc;
  }, {});
};
