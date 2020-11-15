import React from 'react';
import classes from './part-2-conn.module.scss';
import Table from '../table';
import Letters from '../../letters';
import {
  calcArrSampleCharacteristicsForConn,
  calcColumnSum,
  calcSpecSmallDSampleCharacteristics,
  extractColumnValues,
  rounding,
} from '../../helper';
import Formule from '../formule';
import Fraction from '../fraction';

type InputType =
  | {
      type: string;
      title: string;
      x1Arr: number[];
      x2Arr: number[];
      significanceLevel: number;
      criticalTStudent: number;
    }
  | undefined;

type Props = {
  input: InputType;
  variant: number;
};

const Part2Conn = ({ input, variant }: Props) => {
  if (input === undefined) {
    return null;
  }

  const arrSampleCharacteristics = calcArrSampleCharacteristicsForConn(input.x1Arr, input.x2Arr);
  const diSum = calcColumnSum(arrSampleCharacteristics, 3, 1);
  const diMinusSmallDSpecSqrSum = calcColumnSum(arrSampleCharacteristics, 5, 2);
  const dSpec = calcSpecSmallDSampleCharacteristics(
    extractColumnValues(arrSampleCharacteristics, 3)
  );
  const skoSmallDSqr = rounding(diMinusSmallDSpecSqrSum / (input.x1Arr.length - 1), 2);
  const skoSmallD = rounding(Math.sqrt(skoSmallDSqr), 2);
  const bigSSpecSmallD = rounding(skoSmallD / Math.sqrt(input.x1Arr.length), 2);
  const tStudent = rounding(Math.abs(dSpec) / bigSSpecSmallD, 3);
  const numberOfFreedom = input.x1Arr.length * 2 - 2;
  const hypothesisAccepted = tStudent < input.criticalTStudent;

  return (
    <div className={classes.wrapper}>
      <h3>Часть II. Критерий Стьюдента. Вариант {variant}</h3>
      <h3>{input.title}</h3>
      <h3>{`Это ${input.type === 'no-connection' ? 'не' : ''}связанная выборка`}</h3>
      <Table
        tableArr={[
          [Letters.x1, ...input.x1Arr.map((el) => `${el}`)],
          [Letters.x2, ...input.x2Arr.map((el) => `${el}`)],
        ]}
      />
      <ol>
        <li>
          Проверим гипотезу о нормальном распределении результатов
          <ol>
            <li>Выдвигаем нуль-гипотезу.</li>
            H0: ({Letters.specX1} = {Letters.specX2}) средние выборочные значения результатов не
            отличаются значимо
            <li>
              Рассчитываем значения выборочных характеристик {Letters.specSmallD},{' '}
              {Letters.bigSSpecSmallD}
            </li>
            <Table
              tableArr={[
                [
                  'i',
                  Letters.x1i,
                  Letters.x2i,
                  <span key="1">
                    {Letters.di} = {Letters.x1i} - {Letters.x2i}
                  </span>,
                  <span key="2">
                    {Letters.di} - {Letters.specSmallD}
                  </span>,
                  <span key="3">
                    ({Letters.di} - {Letters.specSmallD})<sup>2</sup>
                  </span>,
                ],
                ...arrSampleCharacteristics,
                [
                  <span key="1" />,
                  <span key="2" />,
                  <span key="3" />,
                  <span key="4">
                    {Letters.sum} = {diSum}
                  </span>,
                  <span key="5" />,
                  <span key="6">
                    {Letters.sum} = {diMinusSmallDSpecSqrSum}
                  </span>,
                ],
              ]}
            />
            <Formule>
              {Letters.specSmallD}
              =
              <Fraction
                nom={
                  <span>
                    {Letters.sum}
                    {Letters.di}
                  </span>
                }
                denom="n"
              />
              =
              <Fraction nom={diSum} denom={input.x1Arr.length} />={dSpec}
            </Formule>
            <Formule>
              {Letters.skoSmallD}={Letters.sqrt}
              (
              <Fraction
                nom={
                  <span>
                    {Letters.sum}
                    <span>
                      ({Letters.di} - {Letters.specSmallD})<sup>2</sup>
                    </span>
                  </span>
                }
                denom="n - 1"
              />
              ) ={Letters.sqrt}
              (
              <Fraction nom={diMinusSmallDSpecSqrSum} denom={`${input.x1Arr.length} - 1`} />) =
              {Letters.sqrt}
              {skoSmallDSqr}={skoSmallD}
            </Formule>
            <Formule>
              {Letters.bigSSpecSmallD}
              =
              <Fraction nom={Letters.skoSmallD} denom={<span>{Letters.sqrt}n</span>} />
              =
              <Fraction
                nom={skoSmallD}
                denom={
                  <span>
                    {Letters.sqrt}
                    {input.x1Arr.length}
                  </span>
                }
              />
              ={bigSSpecSmallD}
            </Formule>
            <li>Вычислим расчетное значение t-критерия Стьюдента.</li>
            <Formule>
              {Letters.tStudent}
              =
              <Fraction nom={<span>|{Letters.specSmallD}|</span>} denom={Letters.bigSSpecSmallD} />
              =
              <Fraction nom={<span>|{dSpec}|</span>} denom={bigSSpecSmallD} />={tStudent.toFixed(3)}
            </Formule>
            <li>Определяем число степеней свободы v = 2n - 2 (n - обьём каждой выборки).</li>
            <p>
              v = 2 * {input.x1Arr.length} - 2 = {numberOfFreedom}
            </p>
            <li>Находим по таблице критическое значение t-критерия Стьюдента.</li>
            <p>
              Для уровня значимости {Letters.significanceLevel} = {input.significanceLevel} и числа
              степеней свободы v = {numberOfFreedom} имеем t({input.significanceLevel};
              {numberOfFreedom}) = {input.criticalTStudent}. (табличное значение)
            </p>
            <li>
              Проверяем гипотезу: сравниваем расчетное значение критерия {Letters.tStudent} с
              табличным значением t <br />
              (оцениваем достоверность различий выборочных совокупностей)
            </li>
            <p>
              {Letters.tStudent} {hypothesisAccepted ? '<' : '>'} t ({tStudent}{' '}
              {hypothesisAccepted ? '<' : '>'} {input.criticalTStudent}) (гипотеза{' '}
              {hypothesisAccepted ? 'принимается' : 'отвергается'})
            </p>
          </ol>
        </li>
        <li>Вывод.</li>
        <p>
          Выдвинутая гипотеза об отсутствии различий результатов{' '}
          {hypothesisAccepted ? 'принимается' : 'отвергается'} на уровне значимости{' '}
          {input.significanceLevel}, то есть с вероятностью{' '}
          {(100 - input.significanceLevel * 100) / 100} по средним результатам группы отличаются{' '}
          {hypothesisAccepted ? 'не' : ''}существенно. С вероятностью{' '}
          {(100 - input.significanceLevel * 100) / 100} можно утверждать, что наблюдаемые в
          эксперименте различия носят {hypothesisAccepted ? '' : 'не'}случайный характер,
          следовательно, состояние испытуемых {hypothesisAccepted ? 'не' : ''} изменилось
          существенно.
        </p>
      </ol>
    </div>
  );
};

export default Part2Conn;
