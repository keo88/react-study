import React, { memo } from 'react';
import { TicTacToeAction } from './TicTaeToeModel';

interface IProps {
  tdData: string;
  trIndex: number;
  tdIndex: number;
  dispatch: React.Dispatch<TicTacToeAction>;
}

function TicTd({ tdData, trIndex, tdIndex, dispatch }: IProps) {
  const onClickTd = () => {
    if (tdData) return;
    dispatch({ type: 'SET_CELL', row: trIndex, col: tdIndex });
  };

  return <td onClick={onClickTd}>{tdData}</td>;
}

export default memo(TicTd);
