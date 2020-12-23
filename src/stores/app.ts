import { extendObservable } from 'mobx';
import * as _ from 'lodash';
import { ActionState, Socket } from '../models/common';
import { User } from '../models/user';


export class AppStore {
    socket? : Socket;
    user: User = {
        id: '',
        username: '',
        avatar: ''
    };
    loginState: ActionState = ActionState.INITIAL;
    loading: boolean = false;

    constructor() {
        extendObservable(this, {
            socket: null,
            user: {
                id: '',
                username: '',
                avatar: ''
            },
            loginState: ActionState.INITIAL,
            loading: false
        });
    }

    setSocket = (socket: Socket) => {
        this.socket = socket;
    }

    setUser = (user: User) => {
        this.user = user;
    }

    setLoginState = (loginState: ActionState) => {
        this.loginState = loginState;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    }
}

export default AppStore;
