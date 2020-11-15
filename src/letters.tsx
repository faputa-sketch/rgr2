import React from 'react';

const subILetter = '\u1d62';
const niLetter = `n${subILetter}`;
const niHatchLetter = `${niLetter}\``;
const n1Letter = (
  <span>
    n<sub>1</sub>
  </span>
);
const n2Letter = (
  <span>
    n<sub>2</sub>
  </span>
);
const specXLetter = 'x\u0303';
// const aboveSpecSymbol = '\u0305';
const x1iLetter = (
  <span>
    x<sub>1</sub>
    {subILetter}
  </span>
);
const x2iLetter = (
  <span>
    x<sub>2</sub>
    {subILetter}
  </span>
);
const specX1Letter = (
  <span>
    {specXLetter}
    <sub>1</sub>
  </span>
);
const specX2Letter = (
  <span>
    {specXLetter}
    <sub>2</sub>
  </span>
);
const x1iMinusSpecX1Letter = (
  <span>
    {x1iLetter} - {specX1Letter}
  </span>
);
const x2iMinusSpecX2Letter = (
  <span>
    {x2iLetter} - {specX2Letter}
  </span>
);
const x1iMinusSpecX1SqrLetter = (
  <span>
    ({x1iMinusSpecX1Letter})<sup>2</sup>
  </span>
);
const x2iMinusSpecX2SqrLetter = (
  <span>
    ({x2iMinusSpecX2Letter})<sup>2</sup>
  </span>
);
const specSmallDLetter = 'd\u0305';
const skoLetter = '\u03c3';
const skoSmallDLetter = (
  <span>
    {skoLetter}
    <sub>d</sub>
  </span>
);
const bigSSpecSmallDLetter = (
  <span>
    S<sub>{specSmallDLetter}</sub>
  </span>
);
const diLetter = (
  <span>
    d<sub>i</sub>
  </span>
);
const bigAXLetter = (
  <span>
    A<sub>x</sub>
  </span>
);
const bigAYLetter = (
  <span>
    A<sub>y</sub>
  </span>
);
const hXLetter = (
  <span>
    h<sub>x</sub>
  </span>
);
const hYLetter = (
  <span>
    h<sub>y</sub>
  </span>
);
const nXLetter = (
  <span>
    n<sub>x</sub>
  </span>
);
const nYLetter = (
  <span>
    n<sub>y</sub>
  </span>
);
const getSymbolSub = (symbol: string | JSX.Element, sub: string | JSX.Element) => (
  <span>
    {symbol}
    <sub>{sub}</sub>
  </span>
);

const vILetter = getSymbolSub('v', 'i');
const uILetter = getSymbolSub('u', 'i');
const nVILetter = (
  <span>
    n<sub>{vILetter}</sub>
  </span>
);
const nUILetter = (
  <span>
    n<sub>{uILetter}</sub>
  </span>
);
const nUIVI = getSymbolSub(
  'n',
  <span>
    {uILetter}
    {vILetter}
  </span>
);
const nUIVIMultipleUIMultipleVILetter = (
  <span>
    {nUIVI} * {uILetter} * {vILetter}
  </span>
);

const Letters = {
  subI: subILetter,
  specX: specXLetter,
  specXGen: (
    <span>
      {specXLetter}
      <sub>ген</sub>
    </span>
  ),
  specX1: specX1Letter,
  specX2: specX2Letter,
  specSmallD: specSmallDLetter,
  x1iMinusSpecX1: x1iMinusSpecX1Letter,
  x2iMinusSpecX2: x2iMinusSpecX2Letter,
  x1iMinusSpecX1Sqr: x1iMinusSpecX1SqrLetter,
  x2iMinusSpecX2Sqr: x2iMinusSpecX2SqrLetter,
  dispersion1: (
    <span>
      D<sub>1</sub>
    </span>
  ),
  dispersion2: (
    <span>
      D<sub>2</sub>
    </span>
  ),
  dispersionGen: (
    <span>
      D<sub>ген</sub>
    </span>
  ),
  xi: `x${subILetter}`,
  x1i: x1iLetter,
  x2i: x2iLetter,
  ni: niLetter,
  niHatch: niHatchLetter,
  n1: n1Letter,
  n2: n2Letter,
  sko: skoLetter,
  skoSmallD: skoSmallDLetter,
  bigSSpecSmallD: bigSSpecSmallDLetter,
  x0sqr: (
    <span>
      x<sub>0</sub>
      <sup>2</sup>
    </span>
  ),
  niMinusNiHatchSqr: (
    <span>
      <span>{`(${niLetter} - ${niHatchLetter})`}</span>
      <sup>2</sup>
    </span>
  ),
  sum: '\u2211',
  significanceLevel: '\u03b1',
  infinity: '\u221e',
  sqrt: '\u221a',
  lessOrEqual: '\u2a7d',
  xSqr: (
    <span>
      x<sup>2</sup>
    </span>
  ),
  x1: (
    <span>
      x<sub>1</sub>
    </span>
  ),
  x2: (
    <span>
      x<sub>2</sub>
    </span>
  ),
  tStudent: (
    <span>
      t<sub>p</sub>
    </span>
  ),
  di: diLetter,
  bigAX: bigAXLetter,
  bigAY: bigAYLetter,
  hX: hXLetter,
  hY: hYLetter,
  nX: nXLetter,
  nY: nYLetter,
  yI: getSymbolSub('y', 'i'),
  uI: uILetter,
  u1: getSymbolSub('u', '1'),
  u2: getSymbolSub('u', '2'),
  u3: getSymbolSub('u', '3'),
  u4: getSymbolSub('u', '4'),
  vI: vILetter,
  v1: getSymbolSub('v', '1'),
  v2: getSymbolSub('v', '2'),
  v3: getSymbolSub('v', '3'),
  v4: getSymbolSub('v', '4'),
  skoU: (
    <span>
      {skoLetter}
      <sub>u</sub>
    </span>
  ),
  skoV: (
    <span>
      {skoLetter}
      <sub>v</sub>
    </span>
  ),
  specU: 'u\u0305',
  specV: 'v\u0305',
  specU2: (
    <span>
      {'u\u0305'}
      <sup>2</sup>
    </span>
  ),
  specV2: (
    <span>
      {'v\u0305'}
      <sup>2</sup>
    </span>
  ),
  nVI: nVILetter,
  nUI: nUILetter,
  nVIMultipleVI: (
    <span>
      {nVILetter} * {vILetter}
    </span>
  ),
  nUIMultipleUI: (
    <span>
      {nUILetter} * {uILetter}
    </span>
  ),
  vI2: (
    <span>
      {vILetter}
      <sup>2</sup>
    </span>
  ),
  uI2: (
    <span>
      {uILetter}
      <sup>2</sup>
    </span>
  ),
  nVIMultipleVI2: (
    <span>
      {nVILetter} * {vILetter}
      <sup>2</sup>
    </span>
  ),
  nUIMultipleUI2: (
    <span>
      {nUILetter} * {uILetter}
      <sup>2</sup>
    </span>
  ),
  nUIVIMultipleUIMultipleVI: nUIVIMultipleUIMultipleVILetter,
};

export default Letters;
