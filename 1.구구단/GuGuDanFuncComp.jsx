const React = require("react");
const GuGuDanFuncComp = () => {
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');

    const inputElem = React.useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (first * second === parseInt(value)) {
            setResult('정답: ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }

        inputElem.current.focus();
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <React.Fragment>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit = {onSubmit}>
                <input ref={inputElem} onChange={onChange}/>
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </React.Fragment>
    );
}

module.exports = GuGuDanFuncComp;