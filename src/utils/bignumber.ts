import BigNumber from "bignumber.js";

export function byDecimals(number: number | BigNumber, tokenDecimals = 18) {
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

export function formatPrice(value: number, decimalPlaces = 8) {
  const formatted = new BigNumber(value)
    .decimalPlaces(decimalPlaces, BigNumber.ROUND_DOWN)
    .toFormat();
  return `$${formatted}`;
}
