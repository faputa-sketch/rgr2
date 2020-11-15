import React from 'react';
import * as Helper from './helper';
import * as TableHelper from './table-helper';
import { calcValues, Values } from './calc-values';
import Letters from '../../letters';
import UIFormuleComplex from './u-i-formule-complex';
import Formule from '../formule';
import Fraction from '../fraction';
import graphImg4 from '../../img/graph_4_rgr3.jpg';
import graphImg21 from '../../img/graph_21_rgr3.jpg';
import graphImg22 from '../../img/graph_22_rgr3.jpg';

type Props = {
  variantIndex: number;
};

const Rgr3Part1 = ({ variantIndex }: Props) => {
  if (!Helper.isExistVariant(variantIndex)) {
    return null;
  }

  const values: Values = calcValues(variantIndex);

  if (values === null) {
    return null;
  }

  let graphPath = '';

  if (variantIndex === 3) {
    graphPath = graphImg4;
  }
  if (variantIndex === 20) {
    graphPath = graphImg21;
  }
  if (variantIndex === 21) {
    graphPath = graphImg22;
  }

  const {
    title,
    hX,
    hY,
    aX,
    aY,
    aXIntervalStr,
    aYIntervalStr,
    specU,
    specU2,
    specV,
    specV2,
    nVIMultipleVISum,
    nUIMultipleUISum,
    nVIMultipleVI2Sum,
    nUIMultipleUI2Sum,
    skoU,
    skoV,
    nUIVIMultipleUIMultipleVISum,
    nValue,
    rColleration,
    rCollerationNom,
    rCollerationDenom,
    rCollerationMistake,
    rCollerationMistakeNom,
    rCollerationMistakeDenom,
    regressionKXY,
    regressionKYX,
    regressionKYXPercent,
    specX,
    specY,
    kAX,
    kAY,
    closeness,
    direction,
    firstValue,
    secondValue,
    firstValueSize,
  } = values;

  return (
    <>
      <h3>Вариант {variantIndex + 1}</h3>
      <p>{title}</p>
      {TableHelper.getCorrelationTable(variantIndex)}
      <p>Находим варианты признаков X и Y, имеющие наибольшую частоту:</p>
      <p>
        {Letters.bigAX} = средн. арифм. ({aXIntervalStr}) = {aX}
        <br />
        {Letters.bigAY} = средн. арифм. ({aYIntervalStr}) = {aY}
      </p>
      <p>Находим величину интервалов X и Y:</p>
      <p>
        {Letters.hX} = {hX}. {Letters.hY} = {hY}.
      </p>
      <h3>Часть 1. Элементы корреляционного анализа</h3>
      <ol>
        <li>
          Вычислим коэффициент корреляции для сгруппированных данных методом условных вариант.
        </li>
        <ol type="a">
          <li>Переходим к условным вариантам u и v</li>
          <UIFormuleComplex values={values} />
          <li>
            Вычислим основные статистические характеристики {Letters.specU}, {Letters.specV},{' '}
            {Letters.skoU}, {Letters.skoV}:
          </li>
          {TableHelper.getCorrelationTable2(variantIndex, values)}
          <Formule>
            {Letters.specU}
            =
            <Fraction
              nom={
                <span>
                  {Letters.sum}({Letters.nUIMultipleUI})
                </span>
              }
              denom="n"
            />
            =
            <Fraction nom={nUIMultipleUISum} denom={nValue} />={specU}
          </Formule>
          <Formule>
            {Letters.specU2}
            =
            <Fraction
              nom={
                <span>
                  {Letters.sum}({Letters.nUIMultipleUI2})
                </span>
              }
              denom="n"
            />
            =
            <Fraction nom={nUIMultipleUI2Sum} denom={nValue} />={specU2}
          </Formule>
          <Formule>
            {Letters.specV}
            =
            <Fraction
              nom={
                <span>
                  {Letters.sum}({Letters.nVIMultipleVI})
                </span>
              }
              denom="n"
            />
            =
            <Fraction nom={nVIMultipleVISum} denom={nValue} />={specV}
          </Formule>
          <Formule>
            {Letters.specV2}
            =
            <Fraction
              nom={
                <span>
                  {Letters.sum}({Letters.nVIMultipleVI2})
                </span>
              }
              denom="n"
            />
            =
            <Fraction nom={nVIMultipleVI2Sum} denom={nValue} />={specV2}
          </Formule>
          <Formule>
            {Letters.skoU}={Letters.sqrt}({Letters.specU2} - ({Letters.specU})<sup>2</sup>) =
            {Letters.sqrt}({specU2} - ({specU})<sup>2</sup>) ={skoU}
          </Formule>
          <Formule>
            {Letters.skoV}={Letters.sqrt}({Letters.specV2} - ({Letters.specV})<sup>2</sup>) =
            {Letters.sqrt}({specV2} - ({specV})<sup>2</sup>) ={skoV}
          </Formule>
          <li>Вычислим коэффициент корреляции: </li>
          <Formule>
            r =
            <Fraction
              nom={
                <span>
                  {Letters.sum}({Letters.nUIVIMultipleUIMultipleVI}) - n * {Letters.specU} *{' '}
                  {Letters.specV}
                </span>
              }
              denom={
                <span>
                  n * {Letters.skoU} * {Letters.skoV}
                </span>
              }
            />
            =
            <Fraction
              nom={
                <span>
                  {nUIVIMultipleUIMultipleVISum}-{nValue}* ({specU}) * ({specV})
                </span>
              }
              denom={
                <span>
                  {nValue} * {skoU} * {skoV}
                </span>
              }
            />
            =
            <Fraction nom={rCollerationNom} denom={rCollerationDenom} />={rColleration}
          </Formule>
        </ol>
        <li>Вычислим ошибку коэффициента корреляции: </li>
        <Formule>
          <span>
            S<sub>r</sub>
          </span>
          ={Letters.sqrt}
          (
          <Fraction
            nom={
              <span>
                1 - r<sup>2</sup>
              </span>
            }
            denom={<span>n - 2</span>}
          />
          ) ={Letters.sqrt}
          (
          <Fraction
            nom={
              <span>
                1 - ({rColleration})<sup>2</sup>
              </span>
            }
            denom={<span>{nValue} - 2</span>}
          />
          ) ={Letters.sqrt}
          (
          <Fraction nom={rCollerationMistakeNom} denom={rCollerationMistakeDenom} />) =
          {rCollerationMistake}
        </Formule>
      </ol>
      <h3>Часть 2. Элементы регрессионного анализа</h3>
      <ol>
        <li>Составим уравнения регрессии x(y) и y(x).</li>
        <ol type="a">
          <li>
            <Formule>
              <span>Вычислим коэффициенты регрессии</span>
              b
              <Fraction nom="x" denom="y" />
              и b
              <Fraction nom="y" denom="x" />
            </Formule>
          </li>
          <Formule>
            b
            <Fraction nom="y" denom="x" />
            = r *
            <Fraction
              nom={
                <span>
                  {Letters.skoV} * {Letters.hY}
                </span>
              }
              denom={
                <span>
                  {Letters.skoU} * {Letters.hX}
                </span>
              }
            />
            ={rColleration}
            *
            <Fraction
              nom={
                <span>
                  {skoV} * {hY}
                </span>
              }
              denom={
                <span>
                  {skoU} * {hX}
                </span>
              }
            />
            ={regressionKYX}
          </Formule>
          <Formule>
            b
            <Fraction nom="x" denom="y" />
            = r *
            <Fraction
              nom={
                <span>
                  {Letters.skoU} * {Letters.hX}
                </span>
              }
              denom={
                <span>
                  {Letters.skoV} * {Letters.hY}
                </span>
              }
            />
            ={rColleration}
            *
            <Fraction
              nom={
                <span>
                  {skoU} * {hX}
                </span>
              }
              denom={
                <span>
                  {skoV} * {hY}
                </span>
              }
            />
            ={regressionKXY}
          </Formule>
          <li>
            Вычислим выборочные средние {'x\u0305'}, {'y\u0305'}
          </li>
          <Formule>
            {'x\u0305'}=
            <span>
              A<sub>x</sub>
            </span>
            +{'u\u0305'}*
            <span>
              h<sub>x</sub>
            </span>
            ={aX}+ ({specU}) *{hX}={specX}
          </Formule>
          <Formule>
            {'y\u0305'}=
            <span>
              A<sub>y</sub>
            </span>
            +{'v\u0305'}*
            <span>
              h<sub>y</sub>
            </span>
            ={aY}+ ({specV}) *{hY}={specY}
          </Formule>
          <li>Составим уравнения регрессии: </li>
          <Formule>
            <span>
              a<sub>x</sub>
            </span>
            ={'x\u0305'}
            - b
            <Fraction nom="x" denom="y" />*{'y\u0305'}={specX}-{regressionKXY}*{specY}={kAX}
          </Formule>
          <Formule>
            <span>
              a<sub>y</sub>
            </span>
            ={'y\u0305'}
            - b
            <Fraction nom="y" denom="x" />*{'x\u0305'}={specY}-{regressionKYX}*{specX}={kAY}
          </Formule>
          <Formule>
            x =
            <span>
              a<sub>x</sub>
            </span>
            + b
            <Fraction nom="x" denom="y" />* y
          </Formule>
          <Formule>
            y =
            <span>
              a<sub>y</sub>
            </span>
            + b
            <Fraction nom="y" denom="x" />* x
          </Formule>
          <Formule>
            x ={kAX}+{regressionKXY}* y<span>- уравнение регрессии X от Y</span>
          </Formule>
          <Formule>
            y ={kAY}+{regressionKYX}* x<span>- уравнение регрессии Y от X</span>
          </Formule>
        </ol>
        <li>Построим корреляционное поле и линию регрессии y(x).</li>
        <p>
          Для построения линии регрессии y(x) возьмем два произвольных значения x и вычислим
          соответствующие значения y.
        </p>
        <img src={graphPath} alt="" />
        <li>Вывод.</li>
        <p>
          Коэффициент корреляции r = {rColleration} {'\u00b1'} {rCollerationMistake} свидетельствует
          о {closeness} тесноте взаимосвязи между рассматриваемыми признаками.{' '}
          {direction ? 'Положительное' : 'Отрицательное'} значение коэффициента говорит о{' '}
          {direction ? 'прямой' : 'обратной'} взаимосвязи, то есть с увеличением числа {firstValue}{' '}
          {direction ? 'увеличивается' : 'уменьшается'} также содержание {secondValue} и наоборот.
          По уравнению регрессии Y от X можно прогнозировать содержание {secondValue} по числу{' '}
          {firstValue}. Коэффициент регрессии Y на X равен {regressionKYX}, то есть при увеличении
          числа {firstValue} на {firstValueSize}, содержание {secondValue}{' '}
          {direction ? 'увеличится' : 'уменьшится'} на {regressionKYXPercent}%.
        </p>
      </ol>
    </>
  );
};

export default Rgr3Part1;
