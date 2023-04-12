const React = require('react');
const ReactDom = require('react-dom');
const WordRelay = require('./WordRelay');

// ReactDom.createRoot(document.querySelector('#root')).render(<GuGuDan />);
ReactDom.render(<WordRelay />, document.querySelector('#root'));