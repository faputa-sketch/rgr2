import React from 'react';
import { TableArray, TableCell } from './table';

export const addRow = (tableArr: TableArray, incertRow: TableCell[], incertIndex: number) =>
  tableArr.reduce((acc, row, i) => {
    if (i === incertIndex) {
      acc.push(incertRow);
    }

    acc.push(row);

    return acc;
  }, [] as TableArray);

export const addLastRow = (tableArr: TableArray, incertRow: TableCell[]) =>
  tableArr.reduce((acc, row, i, arr) => {
    acc.push(row);

    if (i === arr.length - 1) {
      acc.push(incertRow);
    }

    return acc;
  }, [] as TableArray);

export const addColumn = (tableArr: TableArray, incertColumn: TableCell[], incertIndex: number) =>
  tableArr.map((row, i) =>
    row.reduce((acc, cell, j) => {
      if (j === incertIndex) {
        acc.push(incertColumn[i]);
      }

      acc.push(cell);

      return acc;
    }, [] as TableCell[])
  );

export const addLastColumn = (tableArr: TableArray, incertColumn: TableCell[]) =>
  tableArr.map((row, i) =>
    row.reduce((acc, cell, j, arr) => {
      acc.push(cell);

      if (j === arr.length - 1) {
        acc.push(incertColumn[i]);
      }

      return acc;
    }, [] as TableCell[])
  );

export const getTableArrByColumns = (columnsTableArr: TableArray) =>
  columnsTableArr.reduce((acc, column) => {
    column.forEach((cell, j) => {
      if (acc[j] === undefined) {
        acc.push([]);
      }

      acc[j].push(cell);
    });

    return acc;
  }, [] as TableArray);

export const clear0 = (tableArr: TableArray) =>
  tableArr.map((row) => row.map((cell) => (cell === 0 ? <span /> : <span>{cell}</span>)));
