import React, { Component } from 'react';
import './ResponseCheck.css';


interface IProps {
    // props
}

interface IState {
    screenState: 'waiting' | 'ready' | 'now';
    message: string;
    result: number[];
}

class ResponseCheck extends Component<IProps, IState> {

    constructor (props: IProps) {
        super(props);
        this.state = {
            screenState: 'waiting',
            message: '클릭해서 시작하세요.',
            result: [],
        };
    }

    render() {
        return (
            <>
                <div id="screen" className={this.state.screenState} onClick={this.onClickScreen}>
                    {this.state.message}
                </div>
                {
                    this.state.result.length === 0 ? null : <div>
                        평균 시간: {this.state.result.reduce((a : number ,c : number) => a + c) / this.state.result.length}
                    </div>
                }
            </>
        );
    }

    private onClickScreen = () : void => {
        this.switchBetweenState();

        console.log("clicked");
    }

    private switchBetweenState = () : void => {
        const { screenState } : IState = this.state;

        let nextScreenState : "waiting" | "ready" | "now";
        let nextMessage : string;

        if (screenState === 'waiting') {
            nextScreenState = 'ready';
            nextMessage = '초록색이 되면 클릭하세요.';

            setTimeout(this.switchToNowState, Math.floor(Math.random() * 1000) + 2000);

        } else if (screenState === 'ready') {
            nextScreenState = 'ready';
            nextMessage = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
        } else {
            // when current state is 'now'.
            nextScreenState = 'waiting';
            nextMessage = '클릭해서 시작하세요.';
        }

        this.setState({
            screenState: nextScreenState,
            message: nextMessage,
        });
    }

    private switchToNowState = () : void => {
        if (this.state.screenState !== 'ready') return;

        this.setState({
            screenState: 'now',
            message: '지금 클릭',
        });
    }
}

export default ResponseCheck;