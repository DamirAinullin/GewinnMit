import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Field from '../field';

function Game(props) {
    const [player, setPlayer] = useState(1);
    const [field, setField] = useState([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ]);

    if (!props.location.state) {
        return <Redirect to='/' />;
    }
    const numbers = [0, 1, 2, 3, 4, 5, 6];
    return <div>
        <p>{props.location.state.players[0].name}</p>
        vs
        <p>{props.location.state.players[1].name}</p>
        <Field field={field} player={player} numbers={numbers} onColumnClick={move} />
    </div>;

    function move(columnID, player) {
        const newField = [...field];
        const index = newField[columnID].indexOf(0);
        if (index === -1) {
            alert('This column already filled. Try to use another one.');
            return;
        }
        newField[columnID][index] = player;
        setField(newField);
        setPlayer(player === 1 ? 2 : 1);
        isGameOver(newField, player, columnID, index);
    }

    function isGameOver(field, player, x, y) {
        if (check(player, field, x, y)) {
            goToGameOverScreen(player);
            return;
        }

        if (field.every(a => a.every(el => el !== 0))) {
            goToGameOverScreen();
        }
    }

    function goToGameOverScreen(player) {
        setTimeout(function () {
            props.history.push({
                pathname: "/gameOverScreen",
                state: { player: getPlayer(player) }
            });
          }, 200);
    }

    function getPlayer(id) {
        return id ? props.location.state.players[id - 1] : null;
    }

    function count(player, field, x, y, dx, dy) {
        let count = 0;
        x += dx;
        y += dy;
        while (x >= 0 && x < field[0].length && y >= 0 && y < field.length && field[x][y] === player) {
            count++;
            x += dx;
            y += dy;
        }
        return count;
    }

    function check(player, field, x, y) {
        return (count(player, field, x, y, -1, 0) + 1 + count(player, field, x, y, 1, 0)) >= 4
            || (count(player, field, x, y, 0, -1) + 1 + count(player, field, x, y, 0, 1)) >= 4
            || (count(player, field, x, y, -1, -1) + 1 + count(player, field, x, y, 1, 1)) >= 4
            || (count(player, field, x, y, -1, 1) + 1 + count(player, field, x, y, 1, -1)) >= 4;
    }
}

export default Game;
