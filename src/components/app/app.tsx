import React, { useState } from 'react';
import classes from './app.module.scss';
import InputData from '../../input-data';
import Part1 from '../part-1';
import Part2Conn from '../part-2-conn';
import Part2NoConn from '../part-2-no-conn';

const App = () => {
  const wrapperStyle: React.CSSProperties = { minHeight: window.innerHeight };
  const [variantIndex, setVariantIndex] = useState(-1);

  const buttons = InputData.rgr2.map((el, i) => {
    const currentVariant = i + 1;

    if (el === null) {
      return null;
    }

    return (
      <button
        type="button"
        key={currentVariant}
        className={classes.button}
        onClick={() => {
          setVariantIndex(i);
        }}
      >
        Вариант {currentVariant}
      </button>
    );
  });

  const input = InputData.rgr2;
  let inputPart1 = null;
  let inputPart2 = null;

  if (variantIndex >= 0 && variantIndex <= 30) {
    inputPart1 = input[variantIndex];
    inputPart2 = input[variantIndex];

    if (inputPart1 !== null) {
      /* eslint-disable-next-line */
      inputPart1 = inputPart1[1];
    }
    if (inputPart2 !== null) {
      /* eslint-disable-next-line */
      inputPart2 = inputPart2[2];
    }
  }

  let part2 = null;

  if (inputPart2 !== null) {
    part2 =
      inputPart2.type === 'connection' ? (
        <Part2Conn variantIndex={variantIndex} input={inputPart2} />
      ) : (
        <Part2NoConn variantIndex={variantIndex} input={inputPart2} />
      );
  }

  return (
    <div className={classes.wrapper} style={wrapperStyle}>
      <h1>Расчетно-графическая работа №2</h1>
      <p className={classes.selectVariant}>Выберите вариант: </p>
      <div className={classes.buttons}>{buttons}</div>
      <div className={classes.content}>
        <Part1 input={inputPart1} variantIndex={variantIndex} />
        {part2}
      </div>
    </div>
  );
};

export default App;
