import React from 'react';
import Column from '../column';

// do it through map
function Field(props) {
    const numbers = [5, 4, 3, 2, 1, 0];
    let columns = props.numbers.map(number =>
        <Column key={number} data={props.field[number]} onPress={props.onColumnClick} columnID={number} player={props.player} numbers={numbers} />);

    return (
        <div>
            {columns}
        </div>
    );
}

export default Field;
