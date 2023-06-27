import React from 'react';
import './TicTacToe.css';
// eslint-disable-next-line import/no-cycle
import { CellType } from './TicTacToe';
import TicTr from './TicTr';

interface IProps {
  onClick: () => void;
  tableData: CellType[][];
}

function TicTable({ onClick, tableData }: IProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <table onClick={onClick}>
      <tbody>
        {Array.from({ length: tableData.length }, (_, i) => (
          <TicTr trData={tableData[i]} />
        ))}
      </tbody>
    </table>
  );
}

export default TicTable;
