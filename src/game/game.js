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
        <p>{props.location.state.players[0].Name}</p>
        vs
        <p>{props.location.state.players[1].Name}</p>
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
        isGameOver(newField, player);
    }

    function isGameOver(field, player) {
        let horiz = 0;
        let vertic = 0;
        let prevHoriz = -1;
        let prevVertic = -1;
        let current = -1;
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (prevVertic === -1) {
                    prevVertic = field[i][j];
                }
                current = field[i][j];
                vertic = current === player ? (vertic + 1) : 0;
                if (vertic === 4) {
                    goToGameOverScreen(player);
                }
                prevVertic = field[i][j];
            }
        }

        for (let j = 0; j < field[0].length; j++) {
            for (let i = 0; i < field.length; i++) {
                if (prevHoriz === -1) {
                    prevHoriz = field[i][j];
                }
                current = field[i][j];
                horiz = current === player ? (horiz + 1) : 0;
                if (horiz === 4) {
                    goToGameOverScreen(player);
                }
                prevHoriz = field[i][j];
            }
        }
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === 0) {
                    return;
                }
            }
        }
        goToGameOverScreen();
    }

    function goToGameOverScreen(player) {
        props.history.push({
            pathname: "/gameOverScreen",
            state: { player: getPlayer(player) }
        });
    }

    function getPlayer(id) {
        if (!id) {
            return null;
        }
        return props.location.state.players[id - 1];
    }
}

export default Game;
