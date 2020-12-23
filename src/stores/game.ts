import { extendObservable } from 'mobx';
import * as _ from 'lodash';
import { Room } from '../models/room';

type History = {
    username: string,
    message: string
}

export class GameStore {
    room: Room = new Room({});
    refresh: boolean = false;
    winner: string = '';
    history: History[] = [];

    constructor() {
        extendObservable(this, {
            room: new Room({}),
            refresh: false,
            winner: '',
            history: []
        });
    }

    setRoom = (room: Room) => {
        this.room = room;
        this.refresh = !this.refresh;
    }

    setWinner = (winner: string) => {
        this.winner = winner;
    }

    setHistory = (history: History[]) => {
        this.history = history;
    }
}

export default GameStore;
