import React from 'react';
import * as Helper from './helper';
import * as TableHelper from '../table/helper';
import Letters from '../../letters';
import InputData from '../../input-data';
import Table from '../table';
import { Values } from './calc-values';

export const getCorrelationTable = (variant: number) => {
  if (Helper.isExistVariant(variant)) {
    const input = InputData.rgr3[variant];

    if (input === null) {
      return null;
    }

    const firstRow = input[1].xIntervals.map((value, i, arr) => {
      const key = i + 1;

      if (key === arr.length) {
        return Letters.nY;
      }

      return (
        <span key={key}>
          {value}-{arr[i + 1]}
        </span>
      );
    });
    const firstColumn = input[1].yIntervals.map((value, i, arr) => {
      const key = i + 1;

      if (key === arr.length) {
        return Letters.nX;
      }

      return (
        <span key={key}>
          {value}-{arr[i + 1]}
        </span>
      );
    });

    const tableArr = TableHelper.addColumn(
      TableHelper.addRow(TableHelper.clear0(input[1].table), firstRow, 0),
      ['y \\ x', ...firstColumn],
      0
    );

    return <Table tableArr={tableArr} />;
  }

  return null;
};

export const getCorrelationTable2 = (variant: number, values: Values) => {
  if (Helper.isExistVariant(variant)) {
    const input = InputData.rgr3[variant];

    if (input === null || values === null) {
      return null;
    }

    const {
      uIArr,
      vIArr,
      nVIMultipleVIArr,
      nUIMultipleUIArr,
      nVIMultipleVISum,
      nUIMultipleUISum,
      vI2Arr,
      uI2Arr,
      nVIMultipleVI2Arr,
      nUIMultipleUI2Arr,
      nVIMultipleVI2Sum,
      nUIMultipleUI2Sum,
      nUIVIMultipleUIMultipleVIArr,
      nUIVIMultipleUIMultipleVISum,
    } = values;

    const firstRow = [...uIArr, Letters.nVI];
    const firstColumn = [...vIArr, Letters.nUI];

    const tableArr = TableHelper.addColumn(
      TableHelper.addRow(TableHelper.clear0(input[1].table), firstRow, 0),
      [
        <span key="1">
          {Letters.vI} \ {Letters.uI}
        </span>,
        ...firstColumn,
      ],
      0
    );

    const columnsTable = TableHelper.getTableArrByColumns([
      [
        Letters.nVIMultipleVI,
        ...nVIMultipleVIArr,
        <span key="1">
          {Letters.sum} = {nVIMultipleVISum}
        </span>,
      ],
      [Letters.vI2, ...vI2Arr, <span key="2" />],
      [
        Letters.nVIMultipleVI2,
        ...nVIMultipleVI2Arr,
        <span key="3">
          {Letters.sum} = {nVIMultipleVI2Sum}
        </span>,
      ],
      [
        Letters.nUIVIMultipleUIMultipleVI,
        ...nUIVIMultipleUIMultipleVIArr,
        <span key="4">
          {Letters.sum} = {nUIVIMultipleUIMultipleVISum}
        </span>,
      ],
    ]);

    const rowsTable = [
      [
        Letters.nUIMultipleUI,
        ...nUIMultipleUIArr,
        <span key="1">
          {Letters.sum} = {nUIMultipleUISum}
        </span>,
      ],
      [Letters.uI2, ...uI2Arr, <span key="2" />],
      [
        Letters.nUIMultipleUI2,
        ...nUIMultipleUI2Arr,
        <span key="3">
          {Letters.sum} = {nUIMultipleUI2Sum}
        </span>,
      ],
    ];

    return (
      <>
        <div style={{ display: 'flex', marginTop: 5 }}>
          <Table tableArr={tableArr} />
          <Table tableArr={columnsTable} />
        </div>
        <Table tableArr={rowsTable} />
      </>
    );
  }

  return null;
};
