import React, { memo } from 'react';
import TicTd from './TicTd';
import { TicTacToeAction } from './TicTaeToeModel';

interface IProps {
  trData: string[];
  trIndex: number;
  dispatch: React.Dispatch<TicTacToeAction>;
}

function TicTr({ trData, trIndex, dispatch }: IProps) {
  return (
    <tr>
      {Array.from({ length: trData.length }, (_, i) => (
        <TicTd
          tdData={trData[i]}
          trIndex={trIndex}
          tdIndex={i}
          dispatch={dispatch}
          key={`${i}-td`}
        />
      ))}
    </tr>
  );
}

export default memo(TicTr);
