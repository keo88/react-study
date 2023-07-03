import React, { useEffect } from 'react';
import { produce } from 'immer';
import TicTable from './TicTable';
import {
  CellType,
  TicTacToeAction,
  TicTacToeState,
  UserType,
} from './TicTaeToeModel';

const initCells: CellType[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const initialState: TicTacToeState = {
  tableData: initCells,
  winner: null,
  currentUserType: 'O' as UserType,
  recentCells: [-1, -1],
};

const reducer = (
  state: TicTacToeState,
  action: TicTacToeAction
): TicTacToeState => {
  switch (action.type) {
    case 'RESET': {
      return {
        ...initialState,
      };
    }
    case 'CHANGE_USER': {
      if (state.winner) return state;

      return {
        ...state,
        currentUserType: state.currentUserType === 'O' ? 'X' : 'O',
      };
    }
    case 'SET_WINNER': {
      if (!action.winner) throw new Error('winner is null');
      return {
        ...state,
        winner: action.winner,
      };
    }
    case 'SET_CELL': {
      if (state.winner) return state;

      return produce(state, (draft) => {
        if (action.row === undefined || action.col === undefined)
          throw new Error('row or col is null');
        draft.tableData[action.row][action.col] = state.currentUserType;
        draft.recentCells = [action.row, action.col];
      });
    }
    default: {
      return state;
    }
  }
};

function TicTacToe() {
  const [state, dispatch] = React.useReducer(reducer, initialState, undefined);
  const { tableData, currentUserType, recentCells } = state;

  useEffect(() => {
    const [row, col] = recentCells;
    if (row < 0 || col < 0) return;

    let win = false;
    if (
      tableData[row][0] === currentUserType &&
      tableData[row][1] === currentUserType &&
      tableData[row][2] === currentUserType
    ) {
      win = true;
    }

    if (
      tableData[0][col] === currentUserType &&
      tableData[1][col] === currentUserType &&
      tableData[2][col] === currentUserType
    ) {
      win = true;
    }

    if (
      tableData[0][0] === currentUserType &&
      tableData[1][1] === currentUserType &&
      tableData[2][2] === currentUserType
    ) {
      win = true;
    }

    if (
      tableData[0][2] === currentUserType &&
      tableData[1][1] === currentUserType &&
      tableData[2][0] === currentUserType
    ) {
      win = true;
    }

    if (win) {
      dispatch({ type: 'SET_WINNER', winner: currentUserType });
    } else {
      dispatch({ type: 'CHANGE_USER' });
    }
  }, [state.tableData]);

  return (
    <>
      <TicTable tableData={state.tableData} dispatch={dispatch} />
      {state.currentUserType && (
        <div>Current Turn is {state.currentUserType} </div>
      )}
      {state.winner && <div>Winner is {state.winner} </div>}
    </>
  );
}

export default TicTacToe;
