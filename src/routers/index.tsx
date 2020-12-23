import React from 'react';
import { Switch, Route } from 'react-router';
import GamingRoomPage from '../pages/gamingRoom';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SplashPage from '../pages/splash';
import WaitingRoomPage from '../pages/watingRoom';
import BgmComponent from './bgm';

import './styles.css';

function Router() {
    return (
        <div className="router-container">
            <BgmComponent />
            <Switch>
                <Route exact path="/">
                    <SplashPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/home">
                    <HomePage />
                </Route>
                <Route path="/waiting-room">
                    <WaitingRoomPage />
                </Route>
                <Route path="/gaming-room">
                    <GamingRoomPage />
                </Route>
            </Switch>
        </div>
    )
}

export default Router;