import React, { useReducer, useMemo } from 'react';
import { produce } from 'immer';
import MineInitForm from './MineInitForm';
import { CODE, MineSearchAction, MineSearchState } from './MineSearchModel';
import MineTable from './MineTable';
import { MineSearchContext } from './MineContext';

const initialState: MineSearchState = {
  tableData: [],
  timer: 0,
  result: '',
  halted: false,
};

const plantMine = (row: number, col: number, mine: number): number[][] => {
  const candidate = Array.from({ length: row * col }, (v, i) => i);

  const shuffle = [];
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen);
  }

  const data: number[][] = [];
  for (let i = 0; i < row; i += 1) {
    const rowData: number[] = [];
    data.push(rowData);
    for (let j = 0; j < col; j += 1) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k += 1) {
    const ver = Math.floor(shuffle[k] / col);
    const hor = shuffle[k] % col;
    data[ver][hor] = CODE.MINE;
  }

  return data;
};

const countNearMine = (row: number, col: number, tableData: number[][]) => {
  const near: number[] = [];
  const checkRow = [row - 1, row, row + 1];
  const checkCol = [col - 1, col, col + 1];
  checkRow.forEach((r) => {
    checkCol.forEach((c) => {
      if (r === row && c === col) {
        return;
      }
      if (tableData[r] && tableData[r][c]) {
        near.push(tableData[r][c]);
      }
    });
  });

  return near.filter((v) =>
    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)
  ).length;
};

const reducer = (state: MineSearchState, action: MineSearchAction) => {
  let targetCellType: number;

  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        tableData: plantMine(action.row, action.col, action.mine),
        halted: false,
      };
    case 'OPEN_CELL':
      return {
        ...state,
        tableData: produce(state.tableData, (draft) => {
          draft[action.row][action.col] = countNearMine(
            action.row,
            action.col,
            state.tableData
          );
        }),
      };
    case 'CLICK_MINE':
      return {
        ...state,
        tableData: produce(state.tableData, (draft) => {
          draft[action.row][action.col] = CODE.CLICKED_MINE;
        }),
        halted: true,
      };
    case 'FLAG_CELL':
      targetCellType =
        state.tableData[action.row][action.col] === CODE.MINE
          ? CODE.FLAG_MINE
          : CODE.FLAG;
      return {
        ...state,
        tableData: produce(state.tableData, (draft) => {
          draft[action.row][action.col] = targetCellType;
        }),
      };
    case 'QUESTION_CELL':
      targetCellType =
        state.tableData[action.row][action.col] === CODE.FLAG_MINE
          ? CODE.QUESTION_MINE
          : CODE.QUESTION;
      return {
        ...state,
        tableData: produce(state.tableData, (draft) => {
          draft[action.row][action.col] = targetCellType;
        }),
      };
    case 'NORMALIZE_CELL':
      targetCellType =
        state.tableData[action.row][action.col] === CODE.QUESTION_MINE
          ? CODE.MINE
          : CODE.NORMAL;
      return {
        ...state,
        tableData: produce(state.tableData, (draft) => {
          draft[action.row][action.col] = targetCellType;
        }),
      };
    default:
      return state;
  }
};

function MineSearch() {
  const [mineSearchState, dispatch] = useReducer(
    reducer,
    initialState,
    undefined
  );

  const { tableData, timer, result, halted } = mineSearchState;

  const contextValue = useMemo(
    () => ({ tableData, dispatch, halted }),
    [halted, tableData]
  );

  return (
    <MineSearchContext.Provider value={contextValue}>
      <MineInitForm />
      <div>{timer}</div>
      <MineTable tableData={tableData} />
      <div>{result}</div>
    </MineSearchContext.Provider>
  );
}

export default MineSearch;
