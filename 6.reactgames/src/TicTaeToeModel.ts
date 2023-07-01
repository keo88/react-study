export type UserType = 'O' | 'X';
export type WinnerType = UserType | null;
export type CellType = UserType | '';

export const ROWS_COUNT = 3;
export interface TicTacToeAction {
  type: 'SET_WINNER' | 'SET_CELL' | 'RESET' | 'CHANGE_USER';
  winner?: WinnerType;
  row?: number;
  col?: number;
  userType?: UserType;
}

export interface TicTacToeState {
  tableData: CellType[][];
  winner: WinnerType;
  currentUserType: UserType;
}
