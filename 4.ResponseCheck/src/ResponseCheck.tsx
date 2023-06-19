import React, {PureComponent, useEffect, useRef, useState} from 'react';
import './ResponseCheck.css';


// interface IProps {
//     // props
// }
//
// interface IState {
//     screenState: 'waiting' | 'ready' | 'now';
//     message: string;
//     result: number[];
// }

// class ResponseCheck extends PureComponent<IProps, IState> {
//
//     private timeout: NodeJS.Timeout | null;
//     private startTime: Date;
//     private endTime: Date;
//
//     constructor (props: IProps) {
//         super(props);
//
//         this.timeout = null;
//         this.startTime = new Date();
//         this.endTime = new Date();
//
//         this.state = {
//             screenState: 'waiting',
//             message: '클릭해서 시작하세요.',
//             result: [],
//         };
//     }
//
//     render() {
//         return (
//             <>
//                 <div id="screen" className={this.state.screenState} onClick={this.onClickScreen}>
//                     {this.state.message}
//                 </div>
//                 {
//                     this.state.result.length === 0 ? null : <div>
//                         평균 시간: {this.state.result.reduce((a : number ,c : number) => a + c) / this.state.result.length}
//                     </div>
//                 }
//             </>
//         );
//     }
//
//     private onClickScreen = () : void => {
//         this.switchBetweenState();
//
//         console.log("clicked");
//     }
//
//     private switchBetweenState = () : void => {
//         const { screenState } : IState = this.state;
//
//         let nextScreenState : "waiting" | "ready" | "now";
//         let nextMessage : string;
//
//         if (screenState === 'waiting') {
//             nextScreenState = 'ready';
//             nextMessage = '초록색이 되면 클릭하세요.';
//
//             this.timeout = setTimeout(this.switchToNowState, Math.floor(Math.random() * 1000) + 2000);
//
//         } else if (screenState === 'ready') {
//             nextScreenState = 'waiting';
//             nextMessage = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
//
//             if (this.timeout !== null) {
//                 clearTimeout(this.timeout);
//             }
//
//         } else if (screenState === 'now') {
//             // when current state is 'now'.
//
//             this.endTime = new Date();
//
//             this.setState((prevState) => {
//                 return {
//                     screenState: 'waiting',
//                     message: '클릭해서 시작하세요.',
//                     result: [...prevState.result, (this.endTime.getTime() - this.startTime.getTime())],
//                 }
//             });
//
//             return;
//
//         } else {
//             nextScreenState = 'waiting';
//             nextMessage = '클릭해서 시작하세요.';
//         }
//
//         this.setState({
//             screenState: nextScreenState,
//             message: nextMessage,
//         });
//     }
//
//     private switchToNowState = () : void => {
//         if (this.state.screenState !== 'ready') return;
//
//         this.startTime = new Date();
//
//         this.setState({
//             screenState: 'now',
//             message: '지금 클릭',
//         });
//     }
// }

function ResponseCheck() {

    const [screenState, setScreenState] = useState<'waiting' | 'ready' | 'now'>('waiting');
    const [message, setMessage] = useState<string>('클릭해서 시작하세요.');
    const [result, setResult] = useState<number[]>([]);

    const timeout = useRef<NodeJS.Timeout | null>(null);
    const startTime = useRef<Date>(new Date());
    const endTime = useRef<Date>(new Date());

    const screenStateRef = useRef(screenState);

    useEffect(
        () => {
            screenStateRef.current = screenState;
        },
        [screenState]
    );


    const onClickScreen = () : void => {
        switchBetweenState();
    }

    const switchBetweenState = () : void => {

        let nextScreenState : "waiting" | "ready" | "now";
        let nextMessage : string;


        if (screenState === 'waiting') {
            nextScreenState = 'ready';
            nextMessage = '초록색이 되면 클릭하세요.';

            timeout.current = setTimeout(switchToNowState, Math.floor(Math.random() * 1000) + 2000);

        } else if (screenState === 'ready') {
            nextScreenState = 'waiting';
            nextMessage = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';

            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            }

        } else if (screenState === 'now') {
            // when current state is 'now'.

            endTime.current = new Date();

            setScreenState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, (endTime.current.getTime() - startTime.current.getTime())]
            });

            return;

        } else {
            nextScreenState = 'waiting';
            nextMessage = '클릭해서 시작하세요.';
        }

        setScreenState(nextScreenState);
        setMessage(nextMessage);
    }

    const switchToNowState = () : void => {

        if (screenStateRef.current !== 'ready') return;

        startTime.current = new Date();

        setScreenState('now');
        setMessage('지금 클릭');
    }

    return (
        <>
            <div id="screen" className={screenState} onClick={onClickScreen}>
                {message}
            </div>
            {
                result.length === 0 ? null : <div>
                    평균 시간: {result.reduce((a : number ,c : number) => a + c) / result.length}
                </div>
            }
        </>
    );
}

export default ResponseCheck;