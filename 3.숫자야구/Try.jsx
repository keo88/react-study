import React, { Component } from 'react';

const TryComponent = (props) => {
    return (
        <>
            <div>{props.index} - {props.value.value}</div>
            <div>스트라이크: {props.value.strikes} 볼: {props.value.balls}</div>
        </>
    );
}

export default TryComponent;