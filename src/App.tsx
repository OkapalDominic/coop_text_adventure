import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/login';
import LobbyPage from './pages/tavern';
import GamePage from './pages/game';

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact={true} path="/" component={LoginPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/tavern" component={LobbyPage} />
                    <Route path="/game" component={GamePage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
