import React, { ChangeEvent } from 'react';
import { MineSearchContext } from './MineContext';

function MineInitForm() {
  const [row, setRow] = React.useState(10);
  const [col, setCol] = React.useState(10);
  const [mineCount, setMineCount] = React.useState(20);
  const { dispatch } = React.useContext(MineSearchContext);

  const onChangeRow = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  }, []);
  const onChangeCol = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCol(Number(e.target.value));
  }, []);
  const onChangeMineCount = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMineCount(Number(e.target.value));
    },
    []
  );

  const onClickButton = () => {
    dispatch({ type: 'START_GAME', row, col, mine: mineCount });
  };

  return (
    <>
      <input
        type="number"
        placeholder="row"
        value={row}
        onChange={onChangeRow}
      />
      <input
        type="number"
        placeholder="col"
        value={col}
        onChange={onChangeCol}
      />
      <input
        type="number"
        placeholder="row"
        value={mineCount}
        onChange={onChangeMineCount}
      />
      <button type="button" onClick={onClickButton}>
        Start
      </button>
    </>
  );
}

export default MineInitForm;
