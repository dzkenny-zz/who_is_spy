import { extendObservable } from 'mobx';
import * as _ from 'lodash';
import { Room } from '../models/room';

export class GameStore {
    room: Room = new Room({});
    refresh: boolean = false;
    winner: string = '';

    constructor() {
        extendObservable(this, {
            room: new Room({}),
            refresh: false,
            winner: ''
        });
    }

    setRoom = (room: Room) => {
        this.room = room;
        this.refresh = !this.refresh;
    }

    setWinner = (winner: string) => {
        this.winner = winner;
    }
}

export default GameStore;
