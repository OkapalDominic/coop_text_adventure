import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

import LoginPage from './pages/login';
import LobbyPage from './pages/lobby';

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <h1>Header</h1>
                </header>
                <Switch>
                    <Route exact={true} path="/" component={LoginPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/lobby/:username" component={LobbyPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
