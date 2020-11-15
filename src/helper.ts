export const rounding = (num: number, fractionLength: number) => {
  return Math.round(num * Math.pow(10, fractionLength)) / Math.pow(10, fractionLength);
};

export const calcXiArr = (xi1: number, hValue: number, count: number): Array<number> => {
  const result = [xi1];
  let currentXi = xi1;

  for (let i = 2; i <= count; i++) {
    currentXi = (currentXi * 10 + hValue * 10) / 10;
    result.push(currentXi);
  }

  return result;
};

const calcRowEqualizationFrequencies = (
  index: number,
  specX: number,
  xi: number,
  sko: number,
  nValue: number,
  hValue: number
): Array<string> => {
  const xiMinusSpecX = (xi * 10 - specX * 10) / 10;
  const ui = Math.round((xiMinusSpecX * 1000) / (sko * 10)) / 100;
  const minusSqrOfUiDivide2 = -Math.pow(ui, 2) / 2;
  const fi =
    Math.round((Math.pow(Math.E, minusSqrOfUiDivide2) * 1e8) / (Math.sqrt(Math.PI * 2) * 1e4)) /
    1e4;
  const niHatch = Math.round(((nValue * (hValue * 10)) / (sko * 10)) * fi * 100) / 100;

  return [`${index}`, xi.toFixed(1), xiMinusSpecX.toFixed(1), `${ui}`, `${fi}`, niHatch.toFixed(2)];
};

export const calcArrEqualizationFrequencies = (
  specX: number,
  xiArr: Array<number>,
  sko: number,
  hValue: number,
  nValue: number
): string[][] => {
  const result = [];

  for (let i = 0; i < xiArr.length; i++) {
    result.push(calcRowEqualizationFrequencies(i + 1, specX, xiArr[i], sko, nValue, hValue));
  }

  return result;
};

export const extractNiHatchArr = (arrEqualizationFrequencies: string[][]): number[] =>
  arrEqualizationFrequencies.map((row) => +row[row.length - 1]);

const calcRowX0Sqr = (index: number, ni: number, niHatch: number): string[] => {
  const niMinusNiHatch = Math.round(ni * 100 - niHatch * 100) / 100;
  const niMinusNiHatchSqr = Math.round(Math.pow(niMinusNiHatch * 100, 2) / 100) / 100;
  const niMinusNiHatchSqrDivideNiHatch =
    Math.round((niMinusNiHatchSqr * 10000) / (niHatch * 100)) / 100;

  return [
    `${index}`,
    `${ni}`,
    niHatch.toFixed(2),
    niMinusNiHatch.toFixed(2),
    niMinusNiHatchSqr.toFixed(2),
    niMinusNiHatchSqrDivideNiHatch.toFixed(2),
  ];
};

export const calcArrX0Sqr = (niArr: number[], niHatchArr: number[]): string[][] =>
  niArr.map((ni, i) => calcRowX0Sqr(i + 1, ni, niHatchArr[i]));

export const extractX0Sqr = (x0SqrArr: string[][]): number =>
  x0SqrArr.reduce((acc, row) => acc + +row[row.length - 1] * 100, 0) / 100;

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
