import React, { useReducer, useMemo } from 'react';
import MineInitForm from './MineInitForm';
import { CODE, MineSearchAction, MineSearchState } from './MineSearchModel';
import MineTable from './MineTable';
import { MineSearchContext } from './MineContext';

const initialState: MineSearchState = {
  tableData: [],
  timer: 0,
  result: '',
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
const reducer = (state: MineSearchState, action: MineSearchAction) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        tableData: plantMine(action.row, action.col, action.mine),
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

  const { tableData, timer, result } = mineSearchState;

  const contextValue = useMemo(() => ({ tableData, dispatch }), [tableData]);

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
