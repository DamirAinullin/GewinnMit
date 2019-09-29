import React from 'react';
import './cell.css';

export default function Cell(props) {
    let className = '';
    if (props.value === 1) {
        className = ' green';
    } else if (props.value === 2) {
        className = ' blue';
    }
    return (
        <div className={'dot' + className}>{props.value}</div>
    );
}
