import {useEffect, useRef, useState} from 'react';

const rspCoords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
}

const scores = {
  rock: 0,
  scissors: 1,
  paper: -1,
}

function RockScissorsPaper() {
  const intervalTime = 100;

  const [imgCoord, setImgCoord] = useState(rspCoords.rock);

  let intervalObj = useRef<NodeJS.Timer | null>(null);
  let imgCoordRef = useRef<string>(imgCoord);

  const componentDidMount = () => {
    console.log('componentDidMount');
    intervalObj.current = setInterval(switchComputerRspState, intervalTime);
  }

  const componentWillUnmount = () => {
    console.log('componentWillUnmount');
    if (intervalObj.current) {
      clearInterval(intervalObj.current);
    }
  }

  useEffect(() => {
    componentDidMount();
    return componentWillUnmount;
  }, []);

  const onClickBtn = (s: string) => {
    return undefined;
  };

  const switchComputerRspState = () => {

    console.log('switchComputerRespState');

    let nextImgCoord: string;

    if (imgCoordRef.current === rspCoords.rock) {
      nextImgCoord = rspCoords.scissors;
    } else if (imgCoordRef.current === rspCoords.scissors) {
      nextImgCoord = rspCoords.paper;
    } else if (imgCoordRef.current === rspCoords.paper) {
      nextImgCoord = rspCoords.rock;
    } else {
      throw new Error('Unknown rspCoords');
    }

    setImgCoord(nextImgCoord);

    imgCoordRef.current = nextImgCoord;
  }

  return (<>
      <div id="computer" style={{
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        width: '142px',
        height: '200px',
      }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissors" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
    </>
  );
}

export default RockScissorsPaper;