import React from 'react';
import classes from './part-2-no-conn.module.scss';
import Table from '../table';
import Letters from '../../letters';
import {
  calcXiArrSum,
  calcSpecX,
  calcDispersion,
  calcArrSampleCharacteristics,
  calcLastColumn,
  calcTStudent,
  calcTStudentNom,
  calcTStudentDenom,
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

const Part2NoConn = ({ input, variant }: Props) => {
  if (input === undefined) {
    return null;
  }

  const x1ArrSum = calcXiArrSum(input.x1Arr);
  const specX1 = calcSpecX(input.x1Arr);
  const dispersion1 = calcDispersion(input.x1Arr);
  const arrSampleCharacteristics1 = calcArrSampleCharacteristics(input.x1Arr);
  const arrSampleCharacteristics1LastColumnSum = calcLastColumn(arrSampleCharacteristics1);

  const x2ArrSum = calcXiArrSum(input.x2Arr);
  const specX2 = calcSpecX(input.x2Arr);
  const dispersion2 = calcDispersion(input.x2Arr);
  const arrSampleCharacteristics2 = calcArrSampleCharacteristics(input.x2Arr);
  const arrSampleCharacteristics2LastColumnSum = calcLastColumn(arrSampleCharacteristics2);

  const tStudent = calcTStudent(
    specX1,
    specX2,
    dispersion1,
    dispersion2,
    input.x1Arr.length,
    input.x1Arr.length
  );
  const numberOfFreedom = input.x1Arr.length + input.x2Arr.length - 2;
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
              Рассчитываем значения выборочных характеристик - {Letters.specX1}, {Letters.specX2},{' '}
              {Letters.dispersion1}, {Letters.dispersion2}.
            </li>
            <Table
              tableArr={[
                ['i', Letters.x1i, Letters.x1iMinusSpecX1, Letters.x1iMinusSpecX1Sqr],
                ...arrSampleCharacteristics1,
                [
                  <span key="1" />,
                  <span key="2">
                    {Letters.sum} = {x1ArrSum}
                  </span>,
                  <span key="3" />,
                  <span key="4">
                    {Letters.sum} = {arrSampleCharacteristics1LastColumnSum}
                  </span>,
                ],
              ]}
            />
            <Formule>
              {Letters.specX1}
              =
              <Fraction nom={`${x1ArrSum}`} denom={`${input.x1Arr.length}`} />={specX1}
            </Formule>
            <Formule>
              {Letters.dispersion1}
              =
              <Fraction
                nom={`${arrSampleCharacteristics1LastColumnSum}`}
                denom={`${input.x1Arr.length} - 1`}
              />
              ={dispersion1}
            </Formule>
            <Table
              tableArr={[
                ['i', Letters.x2i, Letters.x2iMinusSpecX2, Letters.x2iMinusSpecX2Sqr],
                ...arrSampleCharacteristics2,
                [
                  <span key="1" />,
                  <span key="2">
                    {Letters.sum} = {x2ArrSum}
                  </span>,
                  <span key="3" />,
                  <span key="4">
                    {Letters.sum} = {arrSampleCharacteristics2LastColumnSum}
                  </span>,
                ],
              ]}
            />
            <Formule>
              {Letters.specX2}
              =
              <Fraction nom={`${x2ArrSum}`} denom={`${input.x2Arr.length}`} />={specX2}
            </Formule>
            <Formule>
              {Letters.dispersion2}
              =
              <Fraction
                nom={`${arrSampleCharacteristics2LastColumnSum}`}
                denom={`${input.x2Arr.length} - 1`}
              />
              ={dispersion2}
            </Formule>
            <li>Вычисляем расчетное значение t-критерия Стьюдента.</li>
            <p>Используем расчетную формулу:</p>
            <Formule>
              {Letters.tStudent}
              =
              <Fraction
                style={{ position: 'relative', top: 24 }}
                nom={
                  <span>
                    |{Letters.specX1} - {Letters.specX2}|
                  </span>
                }
                denom={
                  <Formule>
                    {Letters.sqrt}
                    (
                    <Fraction nom={Letters.dispersion1} denom={Letters.n1} />
                    +
                    <Fraction nom={Letters.dispersion2} denom={Letters.n2} />)
                  </Formule>
                }
              />
            </Formule>
            <p style={{ position: 'relative', top: 24 }}>Тогда: </p>
            <Formule>
              {Letters.tStudent}
              =
              <Fraction
                style={{ position: 'relative', top: 24 }}
                nom={
                  <span>
                    |{specX1} - {specX2}|
                  </span>
                }
                denom={
                  <Formule>
                    {Letters.sqrt}
                    (
                    <Fraction nom={dispersion1} denom={input.x1Arr.length} />
                    +
                    <Fraction nom={dispersion2} denom={input.x2Arr.length} />)
                  </Formule>
                }
              />
              =
              <Fraction
                nom={calcTStudentNom(specX1, specX2)}
                denom={calcTStudentDenom(
                  dispersion1,
                  dispersion2,
                  input.x1Arr.length,
                  input.x2Arr.length
                )}
              />
              ={tStudent}
            </Formule>
            <li>
              Определяем число степеней свободы v = {Letters.n1} + {Letters.n2} - 2
            </li>
            <p>({Letters.ni} - объемы сравниваемых выборок).</p>
            <p>
              v = {input.x1Arr.length} + {input.x2Arr.length} - 2 = {numberOfFreedom}
            </p>
            <li>Находим по таблице критическое значение t-критерия Стьюдента.</li>
            <p>
              Для уровня значимости {Letters.significanceLevel} = {input.significanceLevel} и числа
              степеней свободы v = {numberOfFreedom} имеем t({input.significanceLevel};
              {numberOfFreedom}) = {input.criticalTStudent} (это табличное значение)
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
          <li>Вывод.</li>
          <p>
            Выдвинутая гипотеза об отсутствии различий результатов{' '}
            {hypothesisAccepted ? 'принимается' : 'отвергается'} на уровне значимости{' '}
            {input.significanceLevel}, то есть с вероятностью{' '}
            {(100 - input.significanceLevel * 100) / 100} по средним результатам группы{' '}
            {hypothesisAccepted ? 'не' : ''}существенно отличаются, что{' '}
            {hypothesisAccepted ? 'не' : ''} позволяет говорить об эффективности применяемой в
            экспериментальной группе методики.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default Part2NoConn;
