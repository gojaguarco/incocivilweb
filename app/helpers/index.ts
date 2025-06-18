import { SelectedSurfaces } from "../(Pages)/cotizador/captureInfoZods";

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

export const colombianPriceStringToNumber = (price: string) =>
  parseInt(price.replace("$", "").replaceAll(".", ""));

export function calculateTotalSurface(surfaces: SelectedSurfaces): number {
  if (!surfaces || surfaces.length === 0) {
    return 0;
  }

  const total = surfaces.reduce((sum, currentSurface) => {
    if (typeof currentSurface.totalSurface === "number") {
      return sum + currentSurface.totalSurface;
    }
    console.warn(
      `Encountered non-numeric totalSurface for item with ID: ${currentSurface.id}. Skipping this item.`
    );
    return sum;
  }, 0);

  return total;
}
