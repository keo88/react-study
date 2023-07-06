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
