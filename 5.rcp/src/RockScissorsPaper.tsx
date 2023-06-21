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
  const [imgCoord, setImgCoord] = useState('0');

  const onClickBtn = (s: string) => {
    return undefined;
  };

  return (<>
      <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissors" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
    </>
  );
}

export default RockScissorsPaper;