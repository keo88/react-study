import React, { memo } from 'react';

interface IProps {
  number: number;
}

const Ball = memo((props: IProps) => {
  const getBallColor = (ballNo: number): string => {
    if (ballNo <= 10) {
      return 'red';
    }
    if (ballNo <= 20) {
      return 'orange';
    }
    if (ballNo <= 30) {
      return 'yellow';
    }
    if (ballNo <= 40) {
      return 'blue';
    }
    return 'green';
  };

  return (
    <div
      className="ball"
      style={{
        background: getBallColor(props.number),
      }}
    >
      {props.number}
    </div>
  );
});

Ball.displayName = 'Ball';

export default Ball;
