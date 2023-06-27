import React from 'react';
// eslint-disable-next-line import/no-cycle
import TicTable from './TicTable';

export const ROWS_COUNT = 3;

export type UserType = 'O' | 'X';
export type WinnerType = UserType | null;
export type CellType = UserType | '';

interface TicTacToeState {
  tableData: CellType[][];
  winner: WinnerType;
  currentUserType: UserType;
}

interface TicTacToeAction {
  type: 'SET_WINNER';
  winner: WinnerType;
}

const initCells: CellType[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const initialState: TicTacToeState = {
  tableData: initCells,
  winner: null,
  currentUserType: 'O' as UserType,
};

const reducer = (
  state: TicTacToeState,
  action: TicTacToeAction
): TicTacToeState => {
  switch (action.type) {
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.winner,
      };
    default:
      return state;
  }
};

function TicTacToe() {
  const [state, dispatch] = React.useReducer(reducer, initialState, undefined);

  const onClickTable = React.useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: 'O' });
  }, []);

  return (
    <>
      <TicTable onClick={onClickTable} tableData={state.tableData} />
      {state.currentUserType && (
        <div>Current Turn is {state.currentUserType} </div>
      )}
      {state.winner && <div>Winner is {state.winner} </div>}
    </>
  );
}

export default TicTacToe;
