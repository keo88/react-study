import React, { Component } from 'react';
import Ball from './Ball';

const BALLS_COUNT = 7;

interface IState {
  winNumbers: number[];
  winBalls: number[];
  bonus: null | number;
  redo: boolean;
}

const getWinNumbers = (ball_count: number = BALLS_COUNT) => {
  const candidate = Array.from({ length: 45 }, (v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const winNumbers = shuffle.slice(0, ball_count).sort((p, c) => p - c);
  const bonus = shuffle[ball_count];
  return [...winNumbers, bonus];
};

export class LottoClass extends Component<Record<string, never>, IState> {
  mounted: boolean;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    };

    this.mounted = false;
  }

  componentDidMount() {
    if (this.mounted) return;
    this.mounted = true;

    for (let i = 0; i < BALLS_COUNT; i += 1) {
      setTimeout(() => {
        this.setState((prevState) => ({
          winBalls: [...prevState.winBalls, prevState.winNumbers[i]],
        }));
      }, (i + 1) * 1000);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onClickRedo = () => {
    console.log('onClickRedo');
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { winNumbers, winBalls, bonus, redo } = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && (
          <button type="submit" onClick={this.onClickRedo}>
            한 번 더!
          </button>
        )}
      </>
    );
  }
}

function Lotto() {
  return <div>lotto</div>;
}

export default Lotto;
