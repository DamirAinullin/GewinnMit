import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Game from './game/game';
import GameOverScreen from './gameOverScreen/gameOverScreen';
import Welcome from './welcomeScreen/welcomeScreen';

function App() {
  return <HashRouter>
    <Route path='/' exact component={Welcome} />
    <Route path='/game' component={Game} />
    <Route path='/gameOverScreen' component={GameOverScreen} />
  </HashRouter>;
}

export default App;
