import { History } from 'history';
import { Stores } from '../stores';
import * as _ from 'lodash';
import { Room } from '../models/room';
import { Setting } from '../models/setting';
import { Player } from '../models/player';
import { Socket } from 'socket.io-client';
import { request } from '../utils/request';

type CreateGameRoom = {
    stores: Stores,
    history: History
}

type JoinGameRoom = {
    stores: Stores,
    history: History,
    roomId: string
}

type UpdateSpyNumber = {
    stores: Stores,
    number: number
}

type UpdateBlankNumber = {
    stores: Stores,
    number: number
}

type UpdateIsRandom = {
    stores: Stores,
    isRandom: boolean
}

type InitWaitingRoomListener = {
    stores: Stores,
    history: History
}

type RemoveWaitingRoomListener = {
    stores: Stores
}

type UpdateHost = {
    stores: Stores,
    host: string
}

type QuitRoom = {
    stores: Stores,
    history: History
}

type StartGame = {
    stores: Stores,
    correct: string,
    wrong: string
}

type KickPlayer = {
    stores: Stores,
    playerId: string
}

type ReportPlayer = {
    stores: Stores,
    playerId: string
}

type BackWaitingRoom = {
    stores: Stores,
    history: History
}

type EndGame = {
    stores: Stores,
    winner: string
}

export const createGameRoom = ({ stores, history }: CreateGameRoom) => {
    stores.appStore.setLoading(true);
    const socket = stores.appStore.socket;
    socket?.emit("/game/create");
    socket?.on('/game/create', (room: Room) => {
        stores.appStore.setLoading(false);
        stores.gameStore.setRoom(room);
        history.replace('/waiting-room');
    })
}

export const joinGameRoom = ({ stores, history, roomId }: JoinGameRoom) => {
    stores.appStore.setLoading(true);
    const { socket, user } = stores.appStore;
    socket?.emit("/game/join", {
        roomId,
        user
    });
    socket?.on('/game/join/all', (room: Room) => {
        stores.appStore.setLoading(false);
        stores.gameStore.setRoom(room);
        history.replace('/waiting-room');
    })
}

export const updateSpyNumber = ({ stores, number }: UpdateSpyNumber) => {
    const { socket } = stores.appStore;
    socket?.emit('/game/setting/spy', number);
}

export const updateBlankNumber = ({ stores, number }: UpdateBlankNumber) => {
    const { socket } = stores.appStore;
    socket?.emit('/game/setting/blank', number);
}

export const updateIsRandom = ({ stores, isRandom }: UpdateIsRandom) => {
    const { socket } = stores.appStore;
    socket?.emit('/game/setting/isRandom', isRandom);
}

export const updateHost = ({ stores, host }: UpdateHost) => {
    const socket = stores.appStore.socket;
    socket?.emit('/game/host', host);
}

export const quitRoom = ({ stores, history }: QuitRoom) => {
    const socket = stores.appStore.socket;

    socket?.emit('/game/quit', stores.appStore.user.id);
    stores.gameStore.setRoom(new Room({}));
    history.replace('/home');
}

export const initWaitingRoomListener = ({ stores, history }: InitWaitingRoomListener) => {
    const { socket } = stores.appStore;
    stores.gameStore.setWinner('');

    socket?.on('/game/setting', (setting: Setting) => {
        const { room, setRoom } = stores.gameStore;
        room.setting = new Setting(setting);
        setRoom(room);
    });

    socket?.on('/game/join', (player: Player) => {
        const { room, setRoom } = stores.gameStore;
        room.players.push(new Player(player));
        setRoom(room);
    });

    socket?.on('/game/quit', (resp: any) => {
        const { room, setRoom } = stores.gameStore;
        const { playerId, host } = resp;
        room.players = room.players.filter(player => player.id !== playerId);
        room.host = host;
        setRoom(room);
    });

    socket?.on('/game/host', (host: string) => {
        const { room, setRoom } = stores.gameStore;
        room.host = host;
        setRoom(room);
    });

    socket?.on('/game/start', () => {
        history.replace('/gaming-room');
    });

    socket?.on('/game/kick', (playerId: string) => {
        const { user } = stores.appStore;
        const { room, setRoom } = stores.gameStore;

        if (user.id === playerId) {
            // leave chat room
            socket.emit('/game/beKicked');
            history.replace('/home');
            const host = room.players.find(p => p.id === room.host);
            return alert(`你已被 ${host?.username} 踢出房間`);
        }

        const playerIndex = room.players.findIndex(player => player.id === playerId);
        if (playerIndex > -1) {
            room.players.splice(playerIndex, 1);
            setRoom(room);
        }
        setRoom(room);
    });
}

export const removeWaitingRoomListener = ({ stores }: RemoveWaitingRoomListener) => {
    const { socket } = stores.appStore;

    socket?.off('/game/setting');
    socket?.off('/game/join');
    socket?.off('/game/quit');
    socket?.off('/game/host');
    socket?.off('/game/start');
    socket?.off('/game/kick');
}

export const startGame = ({ stores, correct, wrong }: StartGame) => {
    const { room } = stores.gameStore;
    if ((room.players.length - (room.setting.isRandom ? 0 : 1)) <= room.setting.blank + room.setting.spy) {
        return alert('白板及臥底人數不能少於或等於玩家人數');
    }

    const { socket } = stores.appStore;
    socket?.emit('/game/start', { correct, wrong });
}

export const initGamingRoomListener = async ({ stores, history }: InitWaitingRoomListener) => {
    // refresh room first
    const gameResp = await request({
        method: 'GET',
        url: 'room'
    });

    const room = new Room(gameResp.room);
    stores.gameStore.setRoom(room);

    const { socket } = stores.appStore;
    socket?.on('/game/report', (resp: any) => {
        const { end, playerId, winner } = resp;
        const { room, setRoom } = stores.gameStore;
        const player = room.players.find(player => player.id === playerId);
        if (player) {
            player.status = 'dead';
        }

        if (end) {
            room.status = 'end';
        }

        setRoom(room);

        if (winner) {
            stores.gameStore.setWinner(winner);
        }
    });

    socket?.on('/game/end', (winner: string) => {
        const { room, setRoom } = stores.gameStore;
        room.status = 'end';
        setRoom(room);
        stores.gameStore.setWinner(winner);
    });

    socket?.on('/game/kick', (playerId: string) => {
        const { user } = stores.appStore;
        const { room, setRoom } = stores.gameStore;

        if (user.id === playerId) {
            // leave chat room
            socket.emit('/game/beKicked');
            history.replace('/home');
            const host = room.players.find(p => p.id === room.host);
            return alert(`你已被 ${host?.username} 踢出房間`);
        }

        const playerIndex = room.players.findIndex(player => player.id === playerId);
        if (playerIndex > -1) {
            room.players.splice(playerIndex, 1);
            setRoom(room);
        }
    });
}

export const removeGamingRoomListener = ({ stores }: RemoveWaitingRoomListener) => {
    const { socket } = stores.appStore;
    socket?.off('/game/report');
    socket?.off('/game/end');
}

export const reportPlayer = ({ stores, playerId }: ReportPlayer) => {
    const { socket } = stores.appStore;
    socket?.emit('/game/report', playerId);
}

export const backWaitingRoom = ({ stores, history }: BackWaitingRoom) => {
    stores.gameStore.setWinner('');
    history.replace('/waiting-room');
}

export const kickPlayer = ({ stores, playerId }: KickPlayer) => {
    const { socket } = stores.appStore;
    socket?.emit('/game/kick', playerId);
}

export const endGame = ({ stores, winner }: EndGame) => {
    const { socket } = stores.appStore;
    socket?.emit('/game/end', winner);
}