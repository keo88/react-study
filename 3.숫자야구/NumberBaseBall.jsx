const React = require('react');

const NumberBaseBall = () => {
    const [answer, setAnswer] = React.useState([1, 2, 3, 4]);
    const [inputs, setInputs] = React.useState([]);
    const [trials, setTrials] = React.useState(0);
    const [result , setResult] = React.useState('');
    const maxTrials = 9;

    React.useEffect(() => {}, [result]);

    console.log('rendered');

    const inputRef = React.useRef(null);

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 9) + 1;
    }

    const calculateScore = (value) => {

        let strike = 0;
        let ball = 0;

        value.map((v, i) => {
            if (v === answer[i]) {
                strike++;
            } else if (answer.includes(v)) {
                ball++;
            }
        });

        return {calcStrikes: strike, calcBalls: ball};
    }


    const onSubmitInput = (e) => {
        e.preventDefault();
        let values = inputRef.current.value.split('').map((v) => parseInt(v));

        let calcStrikes;
        let calcBalls;

        ({ calcStrikes, calcBalls } = calculateScore(values));
        inputs.push(values);
        // setInputs([...inputs, values]);

        if (calcStrikes === 4) {
            setResult(`성공 ${answer}`);
            setAnswer(answer.map(() => getRandomNumber()));
            setTrials(0);
            setInputs([]);
        } else {
            setTrials(trials + 1);
            if (trials === maxTrials) {
                setResult(`실패`);
                setAnswer(answer.map(() => getRandomNumber()));
                setTrials(0);
                setInputs([]);
            } else {
                setResult(`strikes: ${calcStrikes} balls: ${calcBalls}`);
            }
        }
        inputRef.current.focus();
    }

    return (
        <>
            <div></div>
            <form onSubmit={onSubmitInput}>
                <input ref={inputRef}/>
                <button>제출</button>
            </form>
            <div>{result}</div>
            <div>시도: {trials}</div>
            <ul>
                {inputs.map((v, i) => <li key={`${i}`}>{v}</li>)}
            </ul>
        </>
    );
};

module.exports = NumberBaseBall;