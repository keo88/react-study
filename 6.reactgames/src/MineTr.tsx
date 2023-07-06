import React, { memo } from 'react';
import MineTd from './MineTd';
import { CellType } from './MineSearchModel';

interface IProps {
  trData: CellType[];
  row: number;
}

function MineTr({ trData, row }: IProps) {
  return (
    <tr>
      {Array.from({ length: trData.length }, (_, i) => (
        <MineTd key={`${i}-td`} tdData={trData[i]} row={row} col={i} />
      ))}
    </tr>
  );
}

export default memo(MineTr);
