import React, { useReducer, useMemo } from 'react';
import { produce } from 'immer';
import Queue from './Queue';
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

interface NearItem {
  data: number;
  row: number;
  col: number;
}

const countNearMine = (
  rowParam: number,
  colParam: number,
  tableData: number[][]
) => {
  const near: NearItem[] = [];
  const checkRow = [rowParam - 1, rowParam, rowParam + 1];
  const checkCol = [colParam - 1, colParam, colParam + 1];
  checkRow.forEach((r) => {
    checkCol.forEach((c) => {
      if (r === rowParam && c === colParam) {
        return;
      }
      if (tableData[r] && tableData[r][c]) {
        const data = tableData[r][c];
        const row = r;
        const col = c;
        near.push({ data, row, col });
      }
    });
  });

  const len = near.filter((v) =>
    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v.data)
  ).length;

  return {
    near,
    len,
  };
};

const reducer = (state: MineSearchState, action: MineSearchAction) => {
  let targetCellType: number;
  let searchQueue: Queue<[number, number]>;

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
          searchQueue = new Queue();
          searchQueue.enqueue([action.row, action.col]);

          while (!searchQueue.isEmpty()) {
            const [row, col] = searchQueue.dequeue();
            const { near, len } = countNearMine(row, col, draft);

            draft[row][col] = len;

            if (len === 0) {
              for (let i = 0; i < near.length; i += 1) {
                const r = near[i].row;
                const c = near[i].col;
                if (draft[r][c] < CODE.OPENED) {
                  searchQueue.enqueue([r, c]);
                }
              }
            }
          }
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
