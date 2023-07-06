import React from 'react';
import MineTr from './MineTr';
import { CellType } from './MineSearchModel';

interface IProps {
  tableData: CellType[][];
}

function MineTable({ tableData }: IProps) {
  return (
    <table>
      <tbody>
        {Array.from({ length: tableData.length }, (_, i) => (
          <MineTr trData={tableData[i]} row={i} key={`${i}-tr`} />
        ))}
      </tbody>
    </table>
  );
}

export default MineTable;
