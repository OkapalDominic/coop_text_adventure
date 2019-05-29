import openSocket from 'socket.io-client';

import { LoginRequest, LoginResponse, Connected } from '../api_objects/login_api';
import { LeftRoom, ReadyToPlay } from '../api_objects/lobby_messages';

const socket: SocketIOClient.Socket = openSocket('http://localhost:7777');
// If you want to test on other devices on your network...
//const socket: SocketIOClient.Socket = openSocket('http://<your ip address here>:7777');

socket.on('connected', (req: Connected) => {
    sessionStorage.setItem('sessionKey', req.sessionKey);
    socket.removeListener('connected');
});

function afterLogin(res: LoginResponse, cb: (res: LoginResponse) => void): void {
    socket.removeListener('login');
    cb(res);
}

export function removeAllListeners(): void {
    socket.removeAllListeners();
}

export function login(req: LoginRequest, cb: (res: LoginResponse) => void): void {
    socket.on('login', (res: LoginResponse) => afterLogin(res, cb));
    socket.emit('login', req);
}

export function enterRoom(cb: (res: LoginResponse) => void): void {
    socket.on('login', (res: LoginResponse) => cb(res));
}

export function leftRoom(cb: (res: LeftRoom) => void): void {
    socket.on('playerLeft', (res: LeftRoom) => cb(res));
}

export function readyToPlay(req: ReadyToPlay, cb: (res: ReadyToPlay) => void): void {
    socket.emit('readyToPlay', req);
    socket.on('readyToPlay', (res: ReadyToPlay) => cb(res));
}
