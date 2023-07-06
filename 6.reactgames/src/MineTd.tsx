import React from 'react';
import { CellType, CODE } from './MineSearchModel';

interface IProps {
  tdData: CellType;
}

const getTdStyle = (tdData: number) => {
  switch (tdData) {
    case CODE.NORMAL:
    case CODE.MINE:
      return { background: '#444' };
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
    default:
      return '';
  }
};

function MineTd({ tdData }: IProps) {
  return <td style={getTdStyle(tdData)}>{getTdText(tdData)}</td>;
}

export default MineTd;
