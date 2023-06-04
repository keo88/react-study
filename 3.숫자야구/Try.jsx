import React, { Component } from 'react';

const TryComponent = (props) => {
    return (
        <li key={`${props.index}`}>
            {props.index} - {props.value}
        </li>
    );
}

export default TryComponent;