import { Setting } from "./setting";
import { Player } from "./player";
import * as _ from 'lodash';

export class Room {
    id: string = '';
    status: 'waiting' | 'progress' | 'end' = 'waiting';
    players: Player[] = [];
    setting: Setting = new Setting({});
    host: string = '';

    constructor(data: Partial<Room>) {
        this.parse(data);
    }

    parse = (data: Partial<Room>) => {
        this.id = data.id || '';
        this.status = data.status || 'waiting';
        this.players = (data.players || []).map(player => new Player(player));
        this.setting = new Setting(data.setting || {});
        this.host = data.host || '';
    }

    toJson = () => {
        return {
            id: this.id,
            status: this.status,
            host: this.host,
            players: this.players.map(player => player.toJson()),
            setting: this.setting.toJson()
        };
    }
}