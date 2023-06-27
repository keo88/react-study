import React from 'react';
import TicTd from './TicTd';

interface IProps {
  trData: string[];
}

function TicTr({ trData }: IProps) {
  return (
    <tr>
      {Array.from({ length: trData.length }, (_, i) => (
        <TicTd tdData={trData[i]} />
      ))}
    </tr>
  );
}

export default TicTr;
