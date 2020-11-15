import InputData from '../../input-data';
import * as GlobalHelper from '../../helper';

export const calcValues = (variantIndex: number) => {
  const input = InputData.rgr3[variantIndex];

  if (input !== null) {
    const {
      xIntervals,
      yIntervals,
      table,
      title,
      firstValue,
      secondValue,
      firstValueSize,
    } = input[1];

    // nValue
    const nValue = table[table.length - 1][table.length - 1];
    //

    // hx, hy
    const hX = Math.abs(GlobalHelper.rounding(xIntervals[0] - xIntervals[1], 1));
    const hY = Math.abs(GlobalHelper.rounding(yIntervals[0] - yIntervals[1], 1));
    //

    // aX, aY, aXIntervalStr, aYIntervalStr
    const nXRow = [...table[table.length - 1]];
    nXRow.pop();

    const nYColumn = table.reduce((acc, row) => {
      acc.push(row[row.length - 1]);

      return acc;
    }, []);
    nYColumn.pop();

    const nXMaxIndex = nXRow.reduce((acc, el, i, arr) => (arr[acc] > el ? acc : i), 0);
    const nYMaxIndex = nYColumn.reduce((acc, el, i, arr) => (arr[acc] > el ? acc : i), 0);

    const aXInterval = [xIntervals[nXMaxIndex], xIntervals[nXMaxIndex + 1]];
    const aYInterval = [yIntervals[nYMaxIndex], yIntervals[nYMaxIndex + 1]];

    const aXIntervalStr = aXInterval.join(', ');
    const aYIntervalStr = aYInterval.join(', ');

    const aX = GlobalHelper.rounding((aXInterval[1] + aXInterval[0]) / 2, 1);
    const aY = GlobalHelper.rounding((aYInterval[1] + aYInterval[0]) / 2, 1);
    //

    // conditional options: uIArr, vIArr, and also xIArr, yIArr
    const calcXIArr = (acc: number[], el: number, i: number, arr: number[]) =>
      arr.length - 1 === i ? acc : [...acc, GlobalHelper.rounding((el + arr[i + 1]) / 2, 1)];

    const xIArr = xIntervals.reduce(calcXIArr, []);
    const yIArr = yIntervals.reduce(calcXIArr, []);

    const calcUIArr = (zIArr: number[], aZ: number, hZ: number) =>
      zIArr.map((xI) => GlobalHelper.rounding((xI - aZ) / hZ, 1));

    const uIArr = calcUIArr(xIArr, aX, hX);
    const vIArr = calcUIArr(yIArr, aY, hY);
    //

    // nVIMultipleVIArr, nUIMultipleUIArr, nVIMultipleVISum, nUIMultipleUISum
    const nVIMultipleVIArr = vIArr.map((vI, i) => table[i][table[i].length - 1] * vI);
    const nUIMultipleUIArr = uIArr.map((uI, i) => table[table[i].length - 1][i] * uI);

    const nVIMultipleVISum = nVIMultipleVIArr.reduce((acc, el) => acc + el, 0);
    const nUIMultipleUISum = nUIMultipleUIArr.reduce((acc, el) => acc + el, 0);
    //

    // vI2Arr, uI2Arr
    const vI2Arr = vIArr.map((el) => Math.pow(el, 2));
    const uI2Arr = uIArr.map((el) => Math.pow(el, 2));
    //

    // nVIMultipleVI2Arr, nUIMultipleUI2Arr, nVIMultipleVI2Sum, nUIMultipleUI2Sum
    const nVIMultipleVI2Arr = vI2Arr.map((vI2, i) => table[i][table[i].length - 1] * vI2);
    const nUIMultipleUI2Arr = uI2Arr.map((uI2, i) => table[table[i].length - 1][i] * uI2);

    const nVIMultipleVI2Sum = nVIMultipleVI2Arr.reduce((acc, el) => acc + el, 0);
    const nUIMultipleUI2Sum = nUIMultipleUI2Arr.reduce((acc, el) => acc + el, 0);
    //

    // nUIVIMultipleUIMultipleVIArr, nUIVIMultipleUIMultipleVISum
    const nUIVIMultipleUIMultipleVIArr = table.reduce((acc1, row, i, arr1) => {
      if (i === arr1.length - 1) {
        return acc1;
      }

      const nUIVIMultipleUIMultipleVI = row.reduce((acc2, cell, j, arr2) => {
        if (j === arr2.length - 1) {
          return acc2;
        }

        return acc2 + cell * uIArr[j] * vIArr[i];
      }, 0);

      acc1.push(nUIVIMultipleUIMultipleVI);

      return acc1;
    }, []);

    const nUIVIMultipleUIMultipleVISum = nUIVIMultipleUIMultipleVIArr.reduce(
      (acc, el) => acc + el,
      0
    );
    //

    // specU, specU2, specV, specV2
    const specUSpecU2SpecVSpecV2Rounding = 2;

    const specU = GlobalHelper.rounding(nUIMultipleUISum / nValue, specUSpecU2SpecVSpecV2Rounding);
    const specU2 = GlobalHelper.rounding(
      nUIMultipleUI2Sum / nValue,
      specUSpecU2SpecVSpecV2Rounding
    );
    const specV = GlobalHelper.rounding(nVIMultipleVISum / nValue, specUSpecU2SpecVSpecV2Rounding);
    const specV2 = GlobalHelper.rounding(
      nVIMultipleVI2Sum / nValue,
      specUSpecU2SpecVSpecV2Rounding
    );
    //

    // skoU, skoV
    const skoU = GlobalHelper.rounding(Math.sqrt(specU2 - Math.pow(specU, 2)), 2);
    const skoV = GlobalHelper.rounding(Math.sqrt(specV2 - Math.pow(specV, 2)), 2);
    //

    // rColleration, rCollerationNom, rCollerationDenom
    const rCollerationNom = nUIVIMultipleUIMultipleVISum - nValue * specU * specV;
    const rCollerationDenom = GlobalHelper.rounding(nValue * skoU * skoV, 2);
    const rColleration = GlobalHelper.rounding(rCollerationNom / rCollerationDenom, 2);
    //

    // rCollerationMistake, rCollerationMistakeNom, rCollerationMistakeDenom
    const rCollerationMistakeNom = GlobalHelper.rounding(1 - Math.pow(rColleration, 2), 4);
    const rCollerationMistakeDenom = nValue - 2;

    const rCollerationMistake = GlobalHelper.rounding(
      Math.sqrt(rCollerationMistakeNom / rCollerationMistakeDenom),
      2
    );
    //

    // regressionKXY, regressionKYX
    const regressionKXY = GlobalHelper.rounding(rColleration * ((skoU * hX) / (skoV * hY)), 4);
    const regressionKYX = GlobalHelper.rounding(rColleration * ((skoV * hY) / (skoU * hX)), 4);
    //

    // specX, specY
    const specX = GlobalHelper.rounding(aX + specU * hX, 2);
    const specY = GlobalHelper.rounding(aY + specV * hY, 2);
    //

    // kAX, kAY
    const kAX = GlobalHelper.rounding(specX - regressionKXY * specY, 2);
    const kAY = GlobalHelper.rounding(specY - regressionKYX * specX, 2);
    //

    // closeness, direction
    let closeness = 'сильной';

    if (Math.abs(rColleration) >= 0 && Math.abs(rColleration) <= 0.3) {
      closeness = 'слабой';
    }
    if (Math.abs(rColleration) > 0.3 && Math.abs(rColleration) <= 0.5) {
      closeness = 'средней';
    }
    if (Math.abs(rColleration) > 0.5 && Math.abs(rColleration) <= 0.7) {
      closeness = 'заметной';
    }

    const direction = rColleration > 0;
    //

    // regressionKYXPercent
    const regressionKYXPercent = GlobalHelper.rounding(regressionKYX * 100, 2);
    //

    return {
      title,
      hX,
      hY,
      aX,
      aY,
      aXIntervalStr,
      aYIntervalStr,
      xIArr,
      yIArr,
      uIArr,
      vIArr,
      nVIMultipleVIArr,
      nUIMultipleUIArr,
      nVIMultipleVISum,
      nUIMultipleUISum,
      vI2Arr,
      uI2Arr,
      nVIMultipleVI2Arr,
      nUIMultipleUI2Arr,
      nVIMultipleVI2Sum,
      nUIMultipleUI2Sum,
      nUIVIMultipleUIMultipleVIArr,
      nUIVIMultipleUIMultipleVISum,
      specU,
      specU2,
      specV,
      specV2,
      skoU,
      skoV,
      nValue,
      rColleration,
      rCollerationNom,
      rCollerationDenom,
      rCollerationMistake,
      rCollerationMistakeNom,
      rCollerationMistakeDenom,
      regressionKXY,
      regressionKYX,
      specX,
      specY,
      kAX,
      kAY,
      closeness,
      direction,
      firstValue,
      secondValue,
      firstValueSize,
      regressionKYXPercent,
    };
  }

  return null;
};

export type Values = ReturnType<typeof calcValues>;
