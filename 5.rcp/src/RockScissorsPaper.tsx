import {useEffect, useRef, useState} from 'react';
import useInterval from "./useInterval";

interface IDictionary<TValue> {
  [id: string]: TValue;
}

const rspCoords: IDictionary<string> = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
};

const scores: IDictionary<number> = {
  'rock': 0,
  'scissors': 1,
  'paper': -1,
};

const computerChoice = (imgCoord: string) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })![0];
}

function RockScissorsPaper() {
  const intervalTime = 100;
  const intervalRestartTime = 1000;

  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(true);


  let intervalObj = useRef<NodeJS.Timer | null>(null);

  const componentDidMount = () => {
    console.log('componentDidMount');
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

  const onClickBtn = (userChoice: string) => () => {
    if (isRunning) {
      setIsRunning(false);
    }

    const userScore = scores[userChoice];
    const comScore = scores[computerChoice(imgCoord)];

    // console.log('userScore', userScore, 'comScore', comScore);

    const diff = userScore - comScore;
    if (diff === 0) {
      setResult('비겼습니다.');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다.');
      setScore(score + 1)
    } else {
      setResult('졌습니다.');
      setScore(score - 1)
    }

    setTimeout(() => {
      setIsRunning(true);
    }, intervalRestartTime);
  };

  const switchComputerRspState = () => {

    let nextImgCoord: string;

    if (imgCoord === rspCoords.rock) {
      nextImgCoord = rspCoords.scissors;
    } else if (imgCoord === rspCoords.scissors) {
      nextImgCoord = rspCoords.paper;
    } else if (imgCoord === rspCoords.paper) {
      nextImgCoord = rspCoords.rock;
    } else {
      throw new Error('Unknown rspCoords');
    }

    setImgCoord(nextImgCoord);
  }

  useInterval(switchComputerRspState, isRunning ? intervalTime : null);

  return (
    <>
      <div id="computer" style={{
        background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        width: '142px',
        height: '200px',
      }}/>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
        <button id="scissors" className="btn" onClick={onClickBtn('scissors')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
      </div>
      <div>{result}</div>
      <div>{score}</div>
    </>
  );
}

export default RockScissorsPaper;