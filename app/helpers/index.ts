export const numberToColombianPriceString = function (number: number) {
  const numStr = number.toString();
  let result = "";
  let count = 0;

  for (let i = numStr.length - 1; i >= 0; i--) {
    count++;
    result = numStr[i] + result;
    if (count === 3 && i !== 0) {
      result = "." + result;
      count = 0;
    }
  }
  return `$${result}`;
};

export const colombianPriceStringToNumber = (price: string) => parseInt(price.replace("$", "").replaceAll(".", ""));