import React from 'react';
import './App.css';
import Lotto from './Lotto';
import TicTacToe from './TicTacToe';
import MineSearch from './MineSearch';

function App() {
  return (
    <>
      <MineSearch />
      <Lotto />
      <TicTacToe />
    </>
  );
}

export default App;
