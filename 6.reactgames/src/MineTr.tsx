import React from 'react';
import MineTd from './MineTd';
import { CellType } from './MineSearchModel';

interface IProps {
  trData: CellType[];
}

function MineTr({ trData }: IProps) {
  return (
    <tr>
      {Array.from({ length: trData.length }, (_, i) => (
        <MineTd tdData={trData[i]} />
      ))}
    </tr>
  );
}

export default MineTr;
