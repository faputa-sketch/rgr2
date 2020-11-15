import React from 'react';
import Formule from '../formule';
import Fraction from '../fraction';

type Props = {
  uI: number | string | JSX.Element;
  xI: number | string | JSX.Element;
  aX: number | string | JSX.Element;
  hX: number | string | JSX.Element;
  result?: number | string | JSX.Element;
};

const UIFormule = ({ uI, xI, aX, hX, result }: Props) => {
  return (
    <Formule>
      {uI}
      =
      <Fraction
        nom={
          <span>
            {xI} - {aX}
          </span>
        }
        denom={hX}
      />
      {result === null ? null : '='}
      {result}
    </Formule>
  );
};

UIFormule.defaultProps = {
  result: null,
};

export default UIFormule;
