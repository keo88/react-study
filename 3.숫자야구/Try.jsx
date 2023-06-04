import React, { Component } from 'react';

const TryComponent = (props) => {
    return (
        <li key={`${props.index}-{props.value}`}>
            <div>{props.index} - {props.value.value}</div>
            <div>스트라이크: {props.value.strikes} 볼: {props.value.balls}</div>
        </li>
    );
}

export default TryComponent;