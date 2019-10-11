import React from 'react';
import { Link } from 'react-router-dom';
import './welcomeScreen.css';
import axios from 'axios';

function Welcome() {
  const redirectObj = {
    pathname: '/game',
    state: {
      players: [
      {
        id: 1
      },
      {
        id: 2
      }]
    }
  };

  function handleChange(e) {
    const name1 = document.getElementById('player1').value;
    const name2 = document.getElementById('player2').value;
    if (name1 && name2) {
      const element = document.getElementById('start-game-link');
      element.classList.remove('disabled');
      redirectObj.state.players[0].name = name1;
      redirectObj.state.players[1].name = name2;
      axios.post("http://localhost:5000/players", {players : { "1": name1, "2": name2}});
    }
  }

  return <div>
    <h1>Welcome</h1>
    <input type='text' onChange={handleChange} id='player1' />
    <br />
    <input type='text' onChange={handleChange} id='player2' />
    <br />
    <Link id='start-game-link' className='disabled' to={redirectObj}>Start game</Link>
  </div>;
}

export default Welcome;
