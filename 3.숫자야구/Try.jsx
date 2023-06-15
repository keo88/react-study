import React, { memo } from 'react';

const TryComponent = memo((props) => {
    return (
        <>
            <div>{props.index} - {props.value.value}</div>
            <div>스트라이크: {props.value.strikes} 볼: {props.value.balls}</div>
        </>
    );
});

TryComponent.displayName = 'Try';

export default TryComponent;