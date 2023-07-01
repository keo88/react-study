import React from 'react';
import './TicTacToe.css';
// eslint-disable-next-line import/no-cycle
import TicTr from './TicTr';
import { CellType, TicTacToeAction } from './TicTaeToeModel';

interface IProps {
  tableData: CellType[][];
  dispatch: React.Dispatch<TicTacToeAction>;
}

function TicTable({ tableData, dispatch }: IProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <table>
      <tbody>
        {Array.from({ length: tableData.length }, (_, i) => (
          <TicTr
            trData={tableData[i]}
            trIndex={i}
            dispatch={dispatch}
            key={`${i}-tr`}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TicTable;
