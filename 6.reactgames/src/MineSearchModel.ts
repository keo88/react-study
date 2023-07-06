export interface MineSearchState {
  tableData: CellType[][];
  timer: number;
  result: string;
}

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};

export type CellType = number;

export type MineSearchAction = {
  type: 'START_GAME';
  row: number;
  col: number;
  mine: number;
};
