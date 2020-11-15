import React from 'react';
import UIFormule from './u-i-formule';
import Letters from '../../letters';
import { Values } from './calc-values';

type Props = {
  values: Values;
};

const UIFormuleComplex = ({ values }: Props) => {
  if (values === null) {
    return values;
  }

  const { aX, aY, hX, hY, xIArr, yIArr, uIArr, vIArr } = values;

  const uIFormules = uIArr.map((el, i) => {
    const key = i + 1;

    return (
      <UIFormule
        key={key}
        uI={
          <span>
            u<sub>{key}</sub>
          </span>
        }
        xI={xIArr[i]}
        aX={aX}
        hX={hX}
        result={el}
      />
    );
  });
  const vIFormules = vIArr.map((el, i) => {
    const key = i + 1;

    return (
      <UIFormule
        key={key}
        uI={
          <span>
            v<sub>{key}</sub>
          </span>
        }
        xI={yIArr[i]}
        aX={aY}
        hX={hY}
        result={el}
      />
    );
  });

  return (
    <>
      <UIFormule uI={Letters.uI} xI={Letters.xi} aX={Letters.bigAX} hX={Letters.hX} />
      <p>
        {Letters.bigAX} = {aX}; {Letters.hX} = {hX}
      </p>
      {uIFormules}
      <UIFormule uI={Letters.vI} xI={Letters.yI} aX={Letters.bigAY} hX={Letters.hY} />
      <p>
        {Letters.bigAY} = {aY}; {Letters.hY} = {hY}
      </p>
      {vIFormules}
    </>
  );
};

export default UIFormuleComplex;
