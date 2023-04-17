const React = require('react');

const WordRelay = () => {
    const [title, setTitle] = React.useState('초밥');
    const [wordValue, setWordValue] = React.useState('');
    const inputElem = React.useRef(null);

    function onSubmitForm(e) {
        e.preventDefault();
        if (wordValue[0] === title[title.length - 1]) {
            setTitle(wordValue);
            setWordValue('');
        }

        inputElem.current.focus();
    }

    function onWordInput(e) {
        setWordValue(e.target.value);
    }

    return (
        <>
            <div>{title}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputElem} value={wordValue} onChange={onWordInput}/>
                <button>입력!</button>
            </form>
        </>
    );
}

module.exports = WordRelay;