import React from 'react';
import {
  calcXiArr,
  calcArrEqualizationFrequencies,
  extractNiHatchArr,
  calcArrX0Sqr,
  extractX0Sqr,
} from '../../helper';
import u1formuleIcon from '../../img/u1formule-icon.png';
import fiIcon from '../../img/fi-icon.png';
import bigFormuleWithFiIcon from '../../img/bigformulewithfi-icon.png';
import niHatchFormuleIcon from '../../img/nihatchformule-icon.png';
import Table from '../table';
import classes from './part-1.module.scss';
import Letters from '../../letters';
import graphImage21 from '../../img/graph.jpg';
import graphImage22 from '../../img/graph1_22.jpg';
import ArithMeanEstimate from '../arith-mean-estimate';
import DispersionEstimate from '../dispersion-estimate';

type InputType =
  | {
      title: string;
      xi1: number;
      hValue: number;
      arrN: number[];
      specX: number;
      sko: number;
      significanceLevel: number;
      xPirson: number;
      tValue: number;
    }
  | undefined;

type Props = {
  input: InputType;
  variant: number;
};

const Part1 = ({ input, variant }: Props) => {
  if (input === undefined) {
    return null;
  }

  let currentGraph = '';

  if (variant === 21) {
    currentGraph = graphImage21;
  }

  if (variant === 22) {
    currentGraph = graphImage22;
  }

  const nValue = input.arrN.reduce((acc, el) => acc + el, 0);
  const arrXi = calcXiArr(input.xi1, input.hValue, input.arrN.length);

  const arrEqualizationFrequencies = calcArrEqualizationFrequencies(
    input.specX,
    arrXi,
    input.sko,
    input.hValue,
    nValue
  );
  const niHatchArr = extractNiHatchArr(arrEqualizationFrequencies);
  const x0SqrArr = calcArrX0Sqr(input.arrN, niHatchArr);
  const x0SqrValue = extractX0Sqr(x0SqrArr);

  const numberOfFreedom = input.arrN.length - 3;
  const generalDeviation = Math.round(((input.tValue * input.sko) / Math.sqrt(nValue)) * 10) / 10;
  const confidenceLevel = Math.round((1 - input.significanceLevel) * 100) / 100;
  const skoSqr = Math.pow(input.sko * 10, 2) / 100;
  const generalDispersionDeviation =
    Math.round(input.tValue * skoSqr * Math.sqrt(2 / nValue) * 100) / 100;

  return (
    <div className={classes.wrapper}>
      <h3>Часть I. Критерий Пирсона. Вариант {variant}</h3>
      <h3>{input.title}</h3>
      <h3>{`${Letters.specX} = ${input.specX}; ${Letters.sko} = ${input.sko}; h = ${input.hValue}`}</h3>
      <Table
        tableArr={[
          [Letters.xi, ...arrXi.map((el) => el.toFixed(1))],
          [Letters.ni, ...input.arrN.map((el) => `${el}`)],
        ]}
      />
      <p>n = {nValue}</p>
      <ol>
        <li>
          Проверим гипотезу о нормальном распределении результатов
          <ol>
            <li>Выдвигаем нуль-гипотезу.</li>
            H0: результаты в генеральной совокупности имеют нормальное распределение
            <li>Определяем выравнивающие частоты.</li>
            <Table
              tableArr={[
                [
                  'i',
                  `${Letters.xi}`,
                  `${Letters.xi} - ${Letters.specX}`,
                  <img key="img1" src={u1formuleIcon} alt="" />,
                  <img key="img2" src={fiIcon} alt="" />,
                  <img key="img3" src={bigFormuleWithFiIcon} alt="" />,
                ],
                ...arrEqualizationFrequencies,
              ]}
            />
            <li>Определяем расчетное значение критерия {Letters.x0sqr}</li>
            <Table
              tableArr={[
                [
                  'i',
                  Letters.ni,
                  Letters.niHatch,
                  `${Letters.ni} - ${Letters.niHatch}`,
                  Letters.niMinusNiHatchSqr,
                  <img key="img4" src={niHatchFormuleIcon} alt="" />,
                ],
                ...x0SqrArr,
              ]}
            />
            <p>
              {Letters.x0sqr} = <span>{`${Letters.sum} `}</span>
              <img src={niHatchFormuleIcon} alt="" /> = {x0SqrValue}
            </p>
            <li>Определяем число степеней свободы v = n - 3</li>
            <span>{`v = ${input.arrN.length} - 3 = ${numberOfFreedom}`}</span>
            <li>Находим критическое значение критерия согласия {Letters.xSqr}</li>
            <p>
              {`Для уровня значимости ${Letters.significanceLevel} = ${input.significanceLevel} и 
              числа степеней свободы v = ${numberOfFreedom} имеем `}
              <span>{Letters.xSqr} = </span>
              {`(${input.significanceLevel}; ${numberOfFreedom}) = ${input.xPirson}`}
            </p>
            <li>
              Проверяем гипотезу: сравниваем расчетное значение критерия {Letters.x0sqr}с табличным
              значением {Letters.xSqr}.
            </li>
            <p>
              {Letters.x0sqr} &lt; {Letters.xSqr} ({`${x0SqrValue} < ${input.xPirson}`})
            </p>
          </ol>
        </li>
        <li>Построим нормальную кривую.</li>
        Для построения полигона на оси OX отложим значения вариант {Letters.xi}, а на оси OY -
        значения выравнивающих частот {Letters.niHatch}.
        <div>
          <img src={currentGraph} alt="" />
        </div>
        <li>Оценим среднее арифметическое генеральной совокупности.</li>
        <p>
          Имеем n = {nValue}, {Letters.specX} = {input.specX}, {Letters.sko} = {input.sko}.
        </p>
        {/* Letters.infinity - изменяемое */}
        <p>При n &gt; 30, полагают v = {Letters.infinity}.</p>
        <p>
          {/* Letters.infinity - изменяемое */}
          Для {Letters.significanceLevel} = {input.significanceLevel} и v = {Letters.infinity} -
          находим по таблице значение t({input.significanceLevel}; {Letters.infinity}) ={' '}
          {input.tValue}. Тогда
        </p>
        <ArithMeanEstimate
          specX={input.specX}
          tValue={input.tValue}
          nValue={nValue}
          sko={input.sko}
          generalDeviation={generalDeviation}
        />
        <ArithMeanEstimate
          modifier="small"
          specX={input.specX}
          tValue={input.tValue}
          nValue={nValue}
          sko={input.sko}
          generalDeviation={generalDeviation}
        />
        <ArithMeanEstimate
          modifier="very small"
          specX={input.specX}
          tValue={input.tValue}
          nValue={nValue}
          sko={input.sko}
          generalDeviation={generalDeviation}
        />
        <li>Оценим дисперсию генеральной совокупности. </li>
        {/* Letters.infinity - изменяемое */}
        <p>
          Имеем n = {nValue}, {Letters.sko} = {input.sko}, v = {Letters.infinity}.
        </p>
        <p>
          {/* Letters.infinity - изменяемое */}
          Для {Letters.significanceLevel} = {input.significanceLevel} и v = {Letters.infinity} -
          находим по таблице значение t({input.significanceLevel}; {Letters.infinity}) ={' '}
          {input.tValue}. Тогда
        </p>
        <DispersionEstimate
          tValue={input.tValue}
          nValue={nValue}
          sko={input.sko}
          skoSqr={skoSqr}
          generalDispersionDeviation={generalDispersionDeviation}
        />
        <DispersionEstimate
          modifier="small"
          tValue={input.tValue}
          nValue={nValue}
          sko={input.sko}
          skoSqr={skoSqr}
          generalDispersionDeviation={generalDispersionDeviation}
        />
        <DispersionEstimate
          modifier="very small"
          tValue={input.tValue}
          nValue={nValue}
          sko={input.sko}
          skoSqr={skoSqr}
          generalDispersionDeviation={generalDispersionDeviation}
        />
        <li>Вывод</li>
        {/* изменяемое */}
        <p>
          Выдвинутая гипотеза о нормальном распределении результатов принимается на уровне
          значимости {Letters.significanceLevel} = {input.significanceLevel}, так как расчетное
          значение критерия согласия {Letters.x0sqr} = {x0SqrValue} меньше критического значения{' '}
          {Letters.xSqr} = {input.xPirson}. Средний результат в {confidenceLevel * 100}% случаев
          находится в пределах от {(input.specX * 100 - generalDeviation * 100) / 100} и до{' '}
          {(input.specX * 100 + generalDeviation * 100) / 100}, а дисперсия с вероятностью{' '}
          {confidenceLevel} не выйдет за границы{' '}
          {(skoSqr * 100 - generalDispersionDeviation * 100) / 100} -{' '}
          {(skoSqr * 100 + generalDispersionDeviation * 100) / 100}.
        </p>
      </ol>
    </div>
  );
};

export default Part1;
