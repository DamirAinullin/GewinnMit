import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function GameOverScreen(props) {
    if (!props.location.state) {
        return <Redirect to='/' />;
    }
    const message = props.location.state.player
        ? 'Player ' + props.location.state.player.name + ' has won!'
        : 'Nobody has won!';
    return (<div>
        <h1>{message}</h1>
        <Link to={{
            pathname: '/'
        }}>Go to the welcome stream</Link>
    </div>);
}

export default GameOverScreen;
