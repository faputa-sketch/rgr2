import React from 'react';
import Formule from '../formule';
import Fraction from '../fraction';
import Letters from '../../letters';

type Props = {
  modifier?: string;
  specX: number;
  tValue: number;
  nValue: number;
  sko: number;
  generalDeviation: number;
};

const ArithMeanEstimate = ({ modifier, specX, tValue, nValue, sko, generalDeviation }: Props) => {
  if (modifier === 'very small') {
    return (
      <Formule>
        {(specX * 100 - generalDeviation * 100) / 100}
        {Letters.lessOrEqual}
        {Letters.specXGen}
        {Letters.lessOrEqual}
        {(specX * 100 + generalDeviation * 100) / 100}
      </Formule>
    );
  }

  if (modifier === 'small') {
    return (
      <Formule>
        {specX}-{generalDeviation}
        {Letters.lessOrEqual}
        {Letters.specXGen}
        {Letters.lessOrEqual}
        {specX}+{generalDeviation}
      </Formule>
    );
  }

  return (
    <Formule>
      {specX}-{tValue}
      *
      <Fraction nom={`${sko}`} denom={`${Letters.sqrt}${nValue}`} />
      {Letters.lessOrEqual}
      {Letters.specXGen}
      {Letters.lessOrEqual}
      {specX}+{tValue}
      *
      <Fraction nom={`${sko}`} denom={`${Letters.sqrt}${nValue}`} />
    </Formule>
  );
};

ArithMeanEstimate.defaultProps = {
  modifier: 'default',
};

export default ArithMeanEstimate;
