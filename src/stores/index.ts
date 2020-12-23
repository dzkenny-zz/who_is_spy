import React from 'react';
import AppStore from './app';
import GameStore from './game';
import AudioStore from './audio';

const stores = {
    appStore: new AppStore(),
    gameStore: new GameStore(),
    audioStore: new AudioStore()
};

export const storesContext = React.createContext(stores);

export const useStores = () => React.useContext(storesContext);

export type Stores = typeof stores;