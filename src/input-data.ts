const rgr2 = {
  21: {
    1: {
      title: 'Бег 60 м',
      xi1: 10.1,
      hValue: 0.7,
      arrN: [1, 3, 7, 11, 8, 8, 7, 5],
      specX: 12.9,
      sko: 1.3,
      significanceLevel: 0.05,

      /* xPircon и t - изменяемое */
      xPirson: 11.07,
      tValue: 1.96,
    },
    2: {
      type: 'no-connection',
      title: 'Лыжные гонки 15 км',
      x1Arr: [36.74, 37.82, 38.12, 36.91, 37.28, 38.21, 37.51, 37.56],
      x2Arr: [35.61, 35.02, 35.53, 35.12, 35.12, 26.12, 36.49],

      significanceLevel: 0.01,
      criticalTStudent: 3.012,
    },
  },
  22: {
    1: {
      title: 'Бег 60 м',
      xi1: 10.0,
      hValue: 0.5,
      arrN: [4, 2, 5, 12, 10, 8, 7, 2],
      specX: 11.8,
      sko: 0.9,
      significanceLevel: 0.05,

      /* xPircon и t - изменяемое */
      xPirson: 11.07,
      tValue: 1.96,
    },
    2: {
      type: 'connection',
      title: 'Прирост результата в сумме двоеборья',
      x1Arr: [0, 5, 7.5, 7.5, 10, 10, 15, 13],
      x2Arr: [0, 0, 5, 7.5, 10, 10, 12.5, 12.5],

      significanceLevel: 0.01,
      criticalTStudent: 2.977,
    },
  },
};

type Rgr3VariantType = {
  1: {
    xIntervals: number[];
    yIntervals: number[];
    table: number[][];
    title: string;
    firstValue: string;
    secondValue: string;
    firstValueSize: string;
  };
  2: null;
} | null;

const rgr3: Rgr3VariantType[] = [
  null,
  null,
  null,
  {
    1: {
      xIntervals: [0.3, 1.3, 2.3, 3.3],
      yIntervals: [12, 32, 52, 72],
      table: [
        [3, 1, 0, 4],
        [0, 3, 4, 7],
        [0, 0, 4, 4],
        [3, 4, 8, 15],
      ],
      title: `
      Корреляционная таблица зависимости между числом эритроцитов (X в млн.) и
      содержанием гемоглобина (Y в %) в крови
      `,
      firstValue: 'эритроцитов',
      secondValue: 'гемоглобина в крови',
      firstValueSize: '1 млн',
    },
    2: null,
  },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  {
    1: {
      xIntervals: [0.3, 1.3, 2.3, 3.3, 4.3],
      yIntervals: [12, 32, 52, 72, 92],
      table: [
        [1, 2, 0, 0, 3],
        [0, 3, 1, 0, 4],
        [0, 0, 4, 6, 10],
        [0, 0, 0, 8, 8],
        [1, 5, 5, 14, 25],
      ],
      title: `
      Корреляционная таблица зависимости между числом эритроцитов (X в млн.) и
      содержанием гемоглобина (Y в %) в крови
      `,
      firstValue: 'эритроцитов',
      secondValue: 'гемоглобина в крови',
      firstValueSize: '1 млн',
    },
    2: null,
  },
  {
    1: {
      xIntervals: [160, 170, 180, 190],
      yIntervals: [60, 70, 80, 90],
      table: [
        [4, 5, 0, 9],
        [0, 6, 5, 11],
        [0, 1, 4, 5],
        [4, 12, 9, 25],
      ],
      title: 'Корреляционная таблица зависимости между ростом мужчин (X, см) и весом (Y, кг)',
      firstValue: 'роста',
      secondValue: 'веса',
      firstValueSize: '1 см',
    },
    2: null,
  },
  null,
  null,
  null,
];

const InputData = {
  rgr2,
  rgr3,
};

export default InputData;
