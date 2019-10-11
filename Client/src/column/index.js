import React from 'react';
import Cell from '../cell';
import './column.css';

function Column(props) {
    function onPress() {
       props.onPress(props.columnID, props.player);
    }
    const cells = props.numbers.map(number =>
        <Cell key={number} value={props.data[number]} />);
    return (
        <div className='column' onClick={onPress}>
            {cells}
        </div>
    );
}

export default Column;
