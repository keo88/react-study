import React, { useReducer, useMemo } from 'react';
import MineInitForm from './MineInitForm';
import { MineSearchAction, MineSearchState } from './MineSearchModel';
import MineTable from './MineTable';
import { MineSearchContext } from './MineContext';

const initialState: MineSearchState = {
  tableData: [],
  timer: 0,
  result: '',
};

const reducer = (state: MineSearchState, action: MineSearchAction) => {
  switch (action.type) {
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
