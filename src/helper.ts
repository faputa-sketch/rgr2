export const rounding = (num: number, fractionLength: number) => {
  return Math.round(num * Math.pow(10, fractionLength)) / Math.pow(10, fractionLength);
};

const calcRowSampleCharacteristics = (index: number, xi: number, specX: number): string[] => {
  const xiMinusSpecX = Math.round(xi * 100 - specX * 100) / 100;
  const xiMinusSpecXSqr = Math.round(Math.pow(xiMinusSpecX * 100, 2) / 100) / 100;

  return [`${index}`, xi.toFixed(2), xiMinusSpecX.toFixed(2), xiMinusSpecXSqr.toFixed(2)];
};

export const calcXiArrSum = (xiArr: number[]) => {
  return xiArr.reduce((acc, el) => acc + el * 100, 0) / 100;
};

export const calcSpecX = (xiArr: number[]) => {
  const xiArrSum = calcXiArrSum(xiArr);
  const specX = Math.round((xiArrSum * 100) / xiArr.length) / 100;

  return specX;
};

export const calcDispersion = (xiArr: number[]) => {
  const specX = calcSpecX(xiArr);

  const xiMinusSpecXSqrSum =
    Math.round(
      xiArr.reduce((acc, xi) => {
        const xiMinusSpecX = Math.round(xi * 100 - specX * 100) / 100;
        const xiMinusSpecXSqr = Math.round(Math.pow(xiMinusSpecX * 100, 2) / 100) / 100;

        return acc + xiMinusSpecXSqr * 100;
      }, 0)
    ) / 100;

  const dispersion = Math.round((xiMinusSpecXSqrSum * 100) / (xiArr.length - 1)) / 100;

  return dispersion;
};

export const calcArrSampleCharacteristics = (xiArr: number[]): string[][] => {
  const specX = calcSpecX(xiArr);

  return xiArr.map((xi, i) => calcRowSampleCharacteristics(i + 1, xi, specX));
};

export const calcLastColumn = (tableArr: string[][]) => {
  return Math.round(tableArr.reduce((acc, row) => acc + +row[row.length - 1] * 100, 0)) / 100;
};

export const calcTStudentNom = (specX1: number, specX2: number): number => {
  return Math.round(Math.abs(specX1 * 100 - specX2 * 100)) / 100;
};

export const calcTStudentDenom = (
  dispersion1: number,
  dispersion2: number,
  n1: number,
  n2: number
): number => {
  return Math.round(Math.sqrt(dispersion1 / n1 + dispersion2 / n2) * 100) / 100;
};

export const calcTStudent = (
  specX1: number,
  specX2: number,
  dispersion1: number,
  dispersion2: number,
  n1: number,
  n2: number
): number => {
  const nom = calcTStudentNom(specX1, specX2);
  const denom = calcTStudentDenom(dispersion1, dispersion2, n1, n2);

  const result = Math.round((nom * 1000) / denom) / 1000;

  return result;
};

const calcSmallDiColumnSampleCharacteristics = (x1iArr: number[], x2iArr: number[]): number[] => {
  return x1iArr.map((x1i, i) => rounding(x2iArr[i] - x1i, 1));
};

export const calcSmallDiSumSampleCharacteristics = (diArr: number[]): number => {
  return diArr.reduce((acc, di) => rounding(acc + di, 1), 0);
};

export const calcSpecSmallDSampleCharacteristics = (diArr: number[]): number => {
  return rounding(calcSmallDiSumSampleCharacteristics(diArr) / diArr.length, 1);
};

export const calcSmallDiMinusSpecSmallDColumnSampleCharacteristics = (
  diArr: number[],
  dSpec: number
): number[] => {
  return diArr.map((di) => rounding(di - dSpec, 1));
};

export const calcSmallDiMinusSpecSmallDSqrColumnSampleCharacteristics = (
  diArr: number[],
  dSpec: number
): number[] => {
  const diMinusSpecSmallDArr = calcSmallDiMinusSpecSmallDColumnSampleCharacteristics(diArr, dSpec);

  return diMinusSpecSmallDArr.map((diMinusSpecSmallD) =>
    rounding(Math.pow(diMinusSpecSmallD, 2), 2)
  );
};

const calcRowSampleCharacteristicsForConn = (
  index: number,
  x1i: number,
  x2i: number,
  di: number,
  diMinusSmallDSpec: number,
  diMinusSmallDSpecSqr: number
): string[] => {
  return [
    `${index}`,
    `${x1i}`,
    `${x2i}`,
    `${di}`,
    `${diMinusSmallDSpec}`,
    `${diMinusSmallDSpecSqr}`,
  ];
};

export const extractColumnValues = (tableArr: string[][], index: number): number[] => {
  return tableArr.map((row) => +row[index]);
};

export const calcColumnSum = (
  tableArr: string[][],
  index: number,
  fractionLength: number
): number => {
  return tableArr.reduce((acc, row) => rounding(acc + +row[index], fractionLength), 0);
};

export const calcArrSampleCharacteristicsForConn = (
  x1iArr: number[],
  x2iArr: number[]
): string[][] => {
  const diArr = calcSmallDiColumnSampleCharacteristics(x1iArr, x2iArr);
  const dSpec = calcSpecSmallDSampleCharacteristics(diArr);
  const diMinusSmallDSpecArr = calcSmallDiMinusSpecSmallDColumnSampleCharacteristics(diArr, dSpec);
  const diMinusSmallDSpecSqrArr = calcSmallDiMinusSpecSmallDSqrColumnSampleCharacteristics(
    diArr,
    dSpec
  );

  return x1iArr.map((x1i, i) =>
    calcRowSampleCharacteristicsForConn(
      i + 1,
      x1i,
      x2iArr[i],
      diArr[i],
      diMinusSmallDSpecArr[i],
      diMinusSmallDSpecSqrArr[i]
    )
  );
};
