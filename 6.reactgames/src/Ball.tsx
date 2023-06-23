import React from 'react';

interface IProps {
  number: number;
}

function Ball(props: IProps) {

  const getBallColor = (ballNo: number) : string => {
    if (ballNo <= 10) {
      return 'red';
    } else if (ballNo <= 20) {
      return 'orange';
    } else if (ballNo <= 30) {
      return 'yellow';
    } else if (ballNo <= 40) {
      return 'blue';
    } else {
      return 'green';
    }
  }


  return (
    <div className='ball' style={{
      background: getBallColor(props.number)
    }}>
      {props.number}
    </div>
  );
}

export default Ball;