import React from 'react';

interface IProps {
  tdData: string;
}

function MineTd({ tdData }: IProps) {
  return <td>{tdData}</td>;
}

export default MineTd;
