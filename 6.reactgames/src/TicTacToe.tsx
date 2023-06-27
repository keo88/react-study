import React from 'react';
import './TicTacToe.css';

type UserType = 'O' | 'X';
type WinnerType = UserType | null;
type CellType = UserType | '';

const ROWS_COUNT = 3;
const initCells: CellType[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function TicTacToe() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUserType, setCurrentUserType] = React.useState<UserType>('O');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [winner, setWinner] = React.useState<WinnerType>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tableData, setTableData] = React.useState<CellType[][]>(initCells);

  return (
    <>
      <table>
        <tbody>
          {Array.from({ length: ROWS_COUNT }, (_, i) => (
            <tr>
              {Array.from({ length: ROWS_COUNT }, (__, j) => (
                <td>{tableData[i][j]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {currentUserType && <div>Current Turn is {currentUserType} </div>}
      {winner && <div>Winner is {winner} </div>}
    </>
  );
}

export default TicTacToe;
