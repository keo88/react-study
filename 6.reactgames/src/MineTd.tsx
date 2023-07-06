import React from 'react';
import { CellType } from './MineSearchModel';

interface IProps {
  tdData: CellType;
}

function MineTd({ tdData }: IProps) {
  return <td>{tdData}</td>;
}

export default MineTd;
