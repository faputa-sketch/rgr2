import React from 'react';
import classes from './formule.module.scss';

type Props = {
  /* eslint-disable-next-line */
  children: any;
};

const Formule = ({ children }: Props) => {
  return (
    <div className={classes.wrapper}>
      {React.Children.map(children, (el) => (
        <div>{el}</div>
      ))}
    </div>
  );
};

export default Formule;
