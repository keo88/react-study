const React = require("react");

class GuGuDan extends React.Component {
    inputElem;
    constructor(props) {
        super(props);
        this.state = {
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
            value: '',
            result: '',
        };
    }

    render() {
        return (
            <React.Fragment>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref= {this.onLoadInput} type="number" value={this.state.value} onChange={this.onChangeInput} />
                    <button>입력!</button>
                </form>
                <div id="result">{this.state.result}</div>
            </React.Fragment>
        );
    }

    onLoadInput = (c) => {
        this.inputElem = c;
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.first * this.state.second === parseInt(this.state.value)) {
            this.setState((prevState) => {
                return {
                    result: '정답: ' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: '',
                };
            });

            this.inputElem.focus();
        } else {
            this.setState({
                result: '땡',
                value: '',
            });
        }
    }

    onChangeInput = (e) => {
        console.log(this);
        this.setState({value: e.target.value});
    }
}

module.exports = GuGuDan;