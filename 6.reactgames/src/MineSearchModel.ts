export type CellType = 'X' | '';

export interface MineSearchState {
  tableData: CellType[][];
  timer: number;
  result: string;
}

export type MineSearchAction = {
  type: MineSearchActionType;
};

export type MineSearchActionType =
  | 'RESET'
  | 'CLICK_MINE'
  | 'FLAG_CELL'
  | 'QUESTION_CELL'
  | 'NORMALIZE_CELL'
  | 'INCREMENT_TIMER';
