import BigNumber from "bignumber.js";

export function byDecimals(
  number: number | BigNumber | string,
  tokenDecimals = 18
) {
  const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
  return new BigNumber(number).dividedBy(decimals).decimalPlaces(tokenDecimals);
}

export function convertAmountToRawNumber(
  value: number | BigNumber,
  decimals = 18
) {
  return new BigNumber(value)
    .times(new BigNumber("10").pow(decimals))
    .decimalPlaces(0, BigNumber.ROUND_DOWN)
    .toString(10);
}

export function formatPrice(
  value: number | BigNumber | string,
  decimalPlaces = 8,
  showZero = false
) {
  const formatted = new BigNumber(value).decimalPlaces(
    decimalPlaces,
    BigNumber.ROUND_DOWN
  );
  if (!showZero && formatted.isZero()) {
    return "$-";
  }
  return `$${formatted.toFormat()}`;
}

export const INPUT_FORMAT = {
  groupSeparator: "",
  secondaryGroupSize: 0,
  decimalSeparator: ".",
};
