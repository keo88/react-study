import React, { memo, useContext } from 'react';
import { CellType, CODE } from './MineSearchModel';
import { MineSearchContext } from './MineContext';

interface IProps {
  row: number;
  col: number;
  tdData: CellType;
}

const getTdStyle = (tdData: number) => {
  switch (tdData) {
    case CODE.NORMAL:
    case CODE.MINE:
      return { background: '#444' };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return { background: 'red' };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return { background: 'yellow' };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
    default:
      return { background: 'white' };
  }
};

const getTdText = (tdData: number) => {
  switch (tdData) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return '!';
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return '?';
    case CODE.OPENED:
    default:
      return `${tdData}`;
  }
};

function MineTd({ tdData, row, col }: IProps) {
  const { dispatch, halted } = useContext(MineSearchContext);

  const onClickCell = () => {
    if (halted) return;
    switch (tdData) {
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.QUESTION:
      case CODE.FLAG_MINE:
      case CODE.QUESTION_MINE:
        break;
      case CODE.NORMAL:
        dispatch({ type: 'OPEN_CELL', row, col });
        break;
      case CODE.MINE:
        dispatch({ type: 'CLICK_MINE', row, col });
        break;
      default:
        break;
    }
  };

  const onRightClickTd = (
    e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (halted) return;

    switch (tdData) {
      case CODE.NORMAL:
      case CODE.MINE:
        dispatch({ type: 'FLAG_CELL', row, col });
        break;
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        dispatch({ type: 'QUESTION_CELL', row, col });
        break;
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        dispatch({ type: 'NORMALIZE_CELL', row, col });
        break;
      default:
        break;
    }
  };

  return (
    <td
      style={getTdStyle(tdData)}
      onClick={onClickCell}
      onContextMenu={onRightClickTd}
    >
      {getTdText(tdData)}
    </td>
  );
}

export default memo(MineTd);
