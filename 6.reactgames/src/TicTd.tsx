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
    dispatch({ type: 'SET_CELL', row: trIndex, col: tdIndex });
    dispatch({ type: 'CHANGE_USER' });
  };

  return <td onClick={onClickTd}>{tdData}</td>;
}

export default memo(TicTd);
