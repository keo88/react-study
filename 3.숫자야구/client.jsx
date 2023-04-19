const React = require('react');
const ReactDom = require('react-dom/client');
const NumberBaseBall = require('./NumberBaseBall');

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseBall />);
// ReactDom.render(<WordRelay />, document.querySelector('#root'));