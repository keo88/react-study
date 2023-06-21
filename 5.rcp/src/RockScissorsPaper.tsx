import { useState } from 'react';

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
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);

  const onClickBtn = (s: string) => {
    return undefined;
  };

  const switchComputerRspState = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
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