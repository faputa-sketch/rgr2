import React from 'react';
import classes from './fraction.module.scss';

type Props = {
  nom: string | number | JSX.Element;
  denom: string | number | JSX.Element;
  style?: React.CSSProperties;
};

const Fraction = ({ nom, denom, style }: Props) => {
  return (
    <div className={classes.wrapper} style={style}>
      <div>{nom}</div>
      <hr />
      <div>{denom}</div>
    </div>
  );
};

Fraction.defaultProps = {
  style: {},
};

export default Fraction;
