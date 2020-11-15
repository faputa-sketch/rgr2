import React, { useState } from 'react';
import classes from './app.module.scss';
import InputData from '../../input-data';
import Rgr3Part1 from '../rgr-3-part-1';

const App = () => {
  const wrapperStyle: React.CSSProperties = { minHeight: window.innerHeight };
  const [variantIndex, setVariantIndex] = useState(-1);

  const buttons = InputData.rgr3.map((el, i) => {
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

  return (
    <div className={classes.wrapper} style={wrapperStyle}>
      <h1>Расчетно-графическая работа №3</h1>
      <p className={classes.selectVariant}>Выберите вариант: </p>
      <div className={classes.buttons}>{buttons}</div>
      <div className={classes.content}>
        <Rgr3Part1 variantIndex={variantIndex} />
      </div>
    </div>
  );
};

export default App;
