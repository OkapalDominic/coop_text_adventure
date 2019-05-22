import openSocket from 'socket.io-client';

import { LoginRequest, LoginResponse } from '../api_objects/login_api';

const socket = openSocket('http://localhost:7777');

function login(req: LoginRequest, cb: (res: LoginResponse) => void): void {
    socket.on('login', (res: LoginResponse) => cb(res));
    socket.emit('login', req);
};

export { login };