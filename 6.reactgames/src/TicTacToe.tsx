import React from 'react';
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
      return produce(state, (draft) => {
        if (action.row === undefined || action.col === undefined)
          throw new Error('row or col is null');
        draft.tableData[action.row][action.col] = state.currentUserType;
      });
    }
    default: {
      return state;
    }
  }
};

function TicTacToe() {
  const [state, dispatch] = React.useReducer(reducer, initialState, undefined);

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
