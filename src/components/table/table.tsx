import React from 'react';
import classes from './table.module.scss';

export type TableCell = string | number | JSX.Element;
export type TableArray = TableCell[][];

type Props = {
  tableArr: TableArray;
  className?: string;
};

const createTableCells = (tableArr: TableArray) =>
  tableArr.map((rowArr, i) => {
    const trKey = i + 1;

    return (
      <tr key={trKey}>
        {rowArr.map((cellContent, j) => {
          const tdKey = j + 1;

          return <td key={tdKey}>{cellContent}</td>;
        })}
      </tr>
    );
  });

const Table = ({ tableArr, className }: Props) => (
  <table className={[classes.wrapper, className].join(' ')}>
    <thead />
    <tbody>{createTableCells(tableArr)}</tbody>
  </table>
);

Table.defaultProps = {
  className: '',
};

export default Table;
