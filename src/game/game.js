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
        isGameOver(newField, player);
    }

    function isGameOver(field, player) {
        let horizontalItems = 0;
        let verticalItems = 0;
        let current = -1;
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                current = field[i][j];
                verticalItems = current === player ? (verticalItems + 1) : 0;
                if (verticalItems === 4) {
                    goToGameOverScreen(player);
                }
            }
        }

        for (let j = 0; j < field[0].length; j++) {
            for (let i = 0; i < field.length; i++) {
                current = field[i][j];
                horizontalItems = current === player ? (horizontalItems + 1) : 0;
                if (horizontalItems === 4) {
                    goToGameOverScreen(player);
                }
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
        setTimeout(function () {
            props.history.push({
                pathname: "/gameOverScreen",
                state: { player: getPlayer(player) }
            });
          }, 500);
    }

    function getPlayer(id) {
        if (!id) {
            return null;
        }
        return props.location.state.players[id - 1];
    }
}

export default Game;
