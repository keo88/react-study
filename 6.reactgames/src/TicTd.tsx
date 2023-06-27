import React from 'react';

interface IProps {
  tdData: string;
}

function TicTd({ tdData }: IProps) {
  return <td>{tdData}</td>;
}

export default TicTd;
