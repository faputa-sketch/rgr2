import React from 'react';
import Formule from '../formule';
import Fraction from '../fraction';
import Letters from '../../letters';

type Props = {
  modifier?: string;
  tValue: number;
  nValue: number;
  sko: number;
  skoSqr: number;
  generalDispersionDeviation: number;
};

const DispersionEstimate = ({
  modifier,
  tValue,
  nValue,
  sko,
  skoSqr,
  generalDispersionDeviation,
}: Props) => {
  if (modifier === 'very small') {
    return (
      <Formule>
        {(skoSqr * 100 - generalDispersionDeviation * 100) / 100}
        {Letters.lessOrEqual}
        {Letters.dispersionGen}
        {Letters.lessOrEqual}
        {(skoSqr * 100 + generalDispersionDeviation * 100) / 100}
      </Formule>
    );
  }

  if (modifier === 'small') {
    return (
      <Formule>
        {skoSqr}-{generalDispersionDeviation}
        {Letters.lessOrEqual}
        {Letters.dispersionGen}
        {Letters.lessOrEqual}
        {skoSqr}+{generalDispersionDeviation}
      </Formule>
    );
  }

  return (
    <Formule>
      <span>
        {sko}
        <sup>2</sup>
      </span>
      -{tValue}*
      <span>
        {sko}
        <sup>2</sup>
      </span>
      *
      <Fraction nom="2" denom={`${nValue}`} />
      {Letters.lessOrEqual}
      {Letters.dispersionGen}
      {Letters.lessOrEqual}
      <span>
        {sko}
        <sup>2</sup>
      </span>
      -{tValue}*
      <span>
        {sko}
        <sup>2</sup>
      </span>
      *
      <Fraction nom="2" denom={`${nValue}`} />
    </Formule>
  );
};

DispersionEstimate.defaultProps = {
  modifier: 'default',
};

export default DispersionEstimate;
