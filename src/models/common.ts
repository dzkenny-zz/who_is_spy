import { Socket } from "socket.io-client";

export enum ActionState  {
    INITIAL = 'INITIAL',
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE'
}

export type Socket = typeof Socket;