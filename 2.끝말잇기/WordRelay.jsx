const React = require('react');

function WordRelay() {
    const [helloWorldText, setHelloWorldText] = React.useState('Hello World');

    return (
        <h1>
            {helloWorldText}
        </h1>
    );
}

module.exports = WordRelay;