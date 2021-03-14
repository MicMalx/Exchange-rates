import React from 'react';

const input = props => (
    <div>
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.changed} 
        />
    </div>
);

export default input;