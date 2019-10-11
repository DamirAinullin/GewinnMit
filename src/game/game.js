import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Field from '../field';
import axios from 'axios';

function Game(props) {
    useEffect(function() {
        setInterval(() => {
            axios.get('http://localhost:5000').then(function(response) {
                setField(response.data.field);
                setPlayer(response.data.player);
            });
        }, 2000);
    }, []);

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

    function move(columnID) {
        axios.post('http://localhost:5000/move', {
            columnID: columnID
        }).then(function(response) {
            setField(response.data.field);
            isGameOver(response.data);
        });
    }

    function isGameOver(data) {
        if (data.isGameOver) {
            goToGameOverScreen(data.player);
            return;
        }
    }

    function goToGameOverScreen(id) {
        setTimeout(function () {
            axios.get('http://localhost:5000/player/?id=' + id )
                .then(response => {
                    props.history.push({
                        pathname: "/gameOverScreen",
                        state: { player: { name: response.data.name } }
                    });
                    axios.post('http://localhost:5000/clear', {});
                });
          }, 200);
    }
}

export default Game;
