import { History } from 'history';
import { Stores } from '../stores';
import * as _ from 'lodash';
import { Player } from '../models/player';
import { Room } from '../models/room';
import { Setting } from '../models/setting';
import websocket from 'socket.io-client';
import { ActionState, Socket } from '../models/common';
import { request } from '../utils/request';
import { playAudio } from './audio';

type Init = {
    stores: Stores,
    history: History
}

type saveUsername = {
    stores: Stores,
    history: History,
    username: string
}

type UpdateUsername = {
    stores: Stores,
    username: string
}

type UpdateAvatar = {
    stores: Stores,
    avatar: string
}

export const init = async ({ stores, history }: Init) => {
    // generate user id and username
    const resp = await request({
        method: 'POST',
        url: 'login'
    });

    stores.appStore.setUser({
        id: resp.id,
        username: resp.username,
        avatar: resp.avatar
    });

    // after init user, start connect to socket
    const scoket: Socket = websocket('http://58.82.192.33/');
    // const scoket: Socket = websocket('http://localhost:3000/');

    // common listen in whole game
    scoket.on('/user/username', (username: string) => {
        const { user } = stores.appStore;
        user.username = username;
        stores.appStore.setUser(user);
    });

    scoket.on('/user/avatar', (avatar: string) => {
        const { user } = stores.appStore;
        user.avatar = avatar;
        stores.appStore.setUser(user);
    });

    scoket.on('/player/username', (resp: any) => {
        const { id, username } = resp;
        const { room, setRoom } = stores.gameStore;
        const player = room.players.find(player => player.id === id);
        if (player) {
            player.username = username;
        }
        setRoom(room);
    });

    scoket.on('/player/avatar', (resp: any) => {
        const { id, avatar } = resp;
        const { room, setRoom } = stores.gameStore;
        const player = room.players.find(player => player.id === id);
        if (player) {
            player.avatar = avatar;
        }
        playAudio({ stores, soundId: avatar });
        setRoom(room);
    })

    stores.appStore.setSocket(scoket);

    if (!resp.username) {
        return history.replace('/login');
    }

    const gameResp = await request({
        method: 'GET',
        url: 'room'
    });

    if (!gameResp.room) {
        return history.replace('/home');
    }
    else {
        const room = new Room(gameResp.room);
        stores.gameStore.setRoom(room);
        if (room.status === 'progress') {
            return history.replace('/gaming-room');
        }
        else {
            return history.replace('/waiting-room');
        }
    }


    // stores.appStore.setUser({
    //     id: '160862470213998',
    //     username: 'kenny'
    // });

    // stores.gameStore.setRoom(new Room({
    //     id: "697",
    //     status: "progress",
    //     host: "160862470213998",
    //     players: [
    //         new Player({
    //             id: "1608613998",
    //             username: "kenny",
    //             avatar: "ironman",
    //             status: "alive",
    //             identify: "host"
    //         }),
    //         new Player({
    //             id: "18624744887",
    //             username: "json",
    //             avatar: "naruto",
    //             status: "alive",
    //             identify: "normal"
    //         }),
    //         new Player({
    //             id: "1608644623",
    //             username: "jsons",
    //             avatar: "superman",
    //             status: "alive",
    //             identify: "normal"
    //         })
    //     ],
    //     setting: new Setting({
    //         blank: 0,
    //         spy: 1,
    //         isRandom: false,
    //         correct: "聖誕樹",
    //         wrong: "大樹"
    //     })
    // }));
    // return history.replace('/gaming-room');
}

export const saveUsername = async ({ stores, history, username }: saveUsername) => {
    const { socket } = stores.appStore;
    socket?.emit('/user/username', username);
    history.replace('/home');
}

export const updateUsername = async ({ stores, username }: UpdateUsername) => {
    const { socket } = stores.appStore;
    socket?.emit('/user/username', username);
}

export const updateAvatar = async ({ stores, avatar }: UpdateAvatar) => {
    const { socket } = stores.appStore;
    socket?.emit('/user/avatar', avatar);
}