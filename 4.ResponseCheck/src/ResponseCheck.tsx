import React, { PureComponent } from 'react';
import './ResponseCheck.css';


interface IProps {
    // props
}

interface IState {
    screenState: 'waiting' | 'ready' | 'now';
    message: string;
    result: number[];
}

class ResponseCheck extends PureComponent<IProps, IState> {

    private timeout: NodeJS.Timeout | null;
    private startTime: Date;
    private endTime: Date;

    constructor (props: IProps) {
        super(props);

        this.timeout = null;
        this.startTime = new Date();
        this.endTime = new Date();

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

            this.timeout = setTimeout(this.switchToNowState, Math.floor(Math.random() * 1000) + 2000);

        } else if (screenState === 'ready') {
            nextScreenState = 'waiting';
            nextMessage = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';

            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }

        } else if (screenState === 'now') {
            // when current state is 'now'.

            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    screenState: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, (this.endTime.getTime() - this.startTime.getTime())],
                }
            });

            return;

        } else {
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

        this.startTime = new Date();

        this.setState({
            screenState: 'now',
            message: '지금 클릭',
        });
    }
}

export default ResponseCheck;