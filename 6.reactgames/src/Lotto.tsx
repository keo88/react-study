import React, {Component} from 'react';
import Ball from "./Ball";

interface IState {
  winNumbers: number[];
  winBalls: number[];
  bonus: null | number;
  redo: boolean;
}

interface IProps {

}



export class LottoClass extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      winNumbers: [],
      winBalls: [],
      bonus: null,
      redo: false,
    }
  }
  onClickRedo = () => {

  }

  render() {
    const {winNumbers, winBalls, bonus, redo} = this.state;

    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    )
  }
}

function Lotto() {


  return (
    <></>
  );
}

export default Lotto;