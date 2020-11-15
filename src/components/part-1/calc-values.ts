import InputData from '../../input-data';
import * as GlobalHelper from '../../helper';

const calcXiArr = (xi1: number, hValue: number, count: number): Array<number> => {
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
  hValue: number,
  rounding: number
): Array<string> => {
  const xiMinusSpecX = GlobalHelper.rounding(xi - specX, rounding);
  const ui = GlobalHelper.rounding(xiMinusSpecX / sko, 2);
  const minusSqrOfUiDivide2 = -Math.pow(ui, 2) / 2;
  const fi = GlobalHelper.rounding(
    Math.pow(Math.E, minusSqrOfUiDivide2) / Math.sqrt(Math.PI * 2),
    8
  );

  const niHatch = GlobalHelper.rounding(((nValue * hValue) / sko) * fi, rounding);

  return [`${index}`, xi.toFixed(1), xiMinusSpecX.toFixed(1), `${ui}`, `${fi}`, niHatch.toFixed(2)];
};

const calcArrEqualizationFrequencies = (
  specX: number,
  xiArr: Array<number>,
  sko: number,
  hValue: number,
  nValue: number,
  rounding: number
): string[][] => {
  const result = [];

  for (let i = 0; i < xiArr.length; i++) {
    result.push(
      calcRowEqualizationFrequencies(i + 1, specX, xiArr[i], sko, nValue, hValue, rounding)
    );
  }

  return result;
};

const extractNiHatchArr = (arrEqualizationFrequencies: string[][]): number[] =>
  arrEqualizationFrequencies.map((row) => +row[row.length - 1]);

const calcRowX0Sqr = (index: number, ni: number, niHatch: number, rounding: number): string[] => {
  const niMinusNiHatch = GlobalHelper.rounding(ni - niHatch, rounding);
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

const calcArrX0Sqr = (niArr: number[], niHatchArr: number[], rounding: number): string[][] =>
  niArr.map((ni, i) => calcRowX0Sqr(i + 1, ni, niHatchArr[i], rounding));

const extractX0Sqr = (x0SqrArr: string[][]): number =>
  x0SqrArr.reduce((acc, row) => acc + +row[row.length - 1] * 100, 0) / 100;

export const calcValues = (variantIndex: number) => {
  const input = InputData.rgr2[variantIndex];

  if (input !== null) {
    const iPart1 = input[1];

    const nValue = iPart1.arrN.reduce((acc, el) => acc + el, 0);
    const arrXi = calcXiArr(iPart1.xi1, iPart1.hValue, iPart1.arrN.length);
    const arrEqualizationFrequencies = calcArrEqualizationFrequencies(
      iPart1.specX,
      arrXi,
      iPart1.sko,
      iPart1.hValue,
      nValue,
      iPart1.rounding
    );
    const niHatchArr = extractNiHatchArr(arrEqualizationFrequencies);
    const x0SqrArr = calcArrX0Sqr(iPart1.arrN, niHatchArr, iPart1.rounding);
    const x0SqrValue = GlobalHelper.rounding(extractX0Sqr(x0SqrArr), iPart1.rounding);

    const numberOfFreedom = iPart1.arrN.length - 3;
    const generalDeviation = GlobalHelper.rounding(
      (iPart1.tValue * iPart1.sko) / Math.sqrt(nValue),
      iPart1.rounding
    );
    const confidenceLevel = GlobalHelper.rounding(1 - iPart1.significanceLevel, iPart1.rounding);
    const skoSqr = GlobalHelper.rounding(Math.pow(iPart1.sko, 2), iPart1.rounding);
    const generalDispersionDeviation = GlobalHelper.rounding(
      iPart1.tValue * skoSqr * Math.sqrt(2 / nValue),
      iPart1.rounding
    );

    const hypotAccept = x0SqrValue < iPart1.xPirson;

    return {
      nValue,
      arrXi,
      arrEqualizationFrequencies,
      x0SqrArr,
      x0SqrValue,
      numberOfFreedom,
      generalDeviation,
      confidenceLevel,
      skoSqr,
      generalDispersionDeviation,
      hypotAccept,
    };
  }

  return null;
};

export type Values = ReturnType<typeof calcValues>;
