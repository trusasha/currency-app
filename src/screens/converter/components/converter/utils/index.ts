export const formatNumberWithCommas = (str: string) => {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeCommasFromString = (str: string) => {
  return str.replace(/,/g, '');
};

export const validateInput = (input: string) => {
  return input.match(/^[0-9]*\.?[0-9]*$/);
};

export const calculateConversion = (
  fromValue: string,
  fromPriceUSD: number,
  toPriceUSD: number,
): string => {
  if (!fromPriceUSD || !toPriceUSD) {
    return '';
  }

  const convertedValue =
    (parseFloat(removeCommasFromString(fromValue)) * fromPriceUSD) / toPriceUSD;

  if (isNaN(convertedValue)) {
    return '';
  }

  const isBigNumber = convertedValue >= 1000;

  if (isBigNumber) {
    return formatNumberWithCommas(convertedValue.toFixed(0));
  }

  return convertedValue.toFixed(2);
};
