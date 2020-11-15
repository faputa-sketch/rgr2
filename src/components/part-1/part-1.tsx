import React from 'react';
import u1formuleIcon from '../../img/u1formule-icon.png';
import fiIcon from '../../img/fi-icon.png';
import bigFormuleWithFiIcon from '../../img/bigformulewithfi-icon.png';
import niHatchFormuleIcon from '../../img/nihatchformule-icon.png';
import Table from '../table';
import classes from './part-1.module.scss';
import Letters from '../../letters';
import graphImage4 from '../../img/graph_4_rgr2.jpg';
import ArithMeanEstimate from '../arith-mean-estimate';
import DispersionEstimate from '../dispersion-estimate';
import { calcValues } from './calc-values';

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
  | undefined
  | null;

type Props = {
  input: InputType;
  variantIndex: number;
};

const Part1 = ({ input, variantIndex }: Props) => {
  if (input === undefined || input === null) {
    return null;
  }

  const values = calcValues(variantIndex);

  if (values === null) {
    return null;
  }

  let currentGraph = '';

  if (variantIndex === 3) {
    currentGraph = graphImage4;
  }

  const {
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
  } = values;

  return (
    <div className={classes.wrapper}>
      <h3>Часть I. Критерий Пирсона. Вариант {variantIndex + 1}</h3>
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
              {Letters.x0sqr} {hypotAccept ? <span>&lt;</span> : <span>&gt;</span>} {Letters.xSqr}(
              {`${x0SqrValue} ${hypotAccept ? '<' : '>'} ${input.xPirson}`})
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
          Выдвинутая гипотеза о нормальном распределении результатов{' '}
          {hypotAccept ? 'принимается' : 'отвергается'} на уровне значимости{' '}
          {Letters.significanceLevel} = {input.significanceLevel}, так как расчетное значение
          критерия согласия {Letters.x0sqr} = {x0SqrValue} {hypotAccept ? 'меньше' : 'больше'}{' '}
          критического значения
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
