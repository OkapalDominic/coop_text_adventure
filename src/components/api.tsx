import openSocket from 'socket.io-client';

import { LoginRequest, LoginResponse } from '../api_objects/login_api';

const socket = openSocket('http://localhost:7777');

function afterLogin(res: LoginResponse, cb: (res: LoginResponse) => void): void {
    socket.removeListener('login');
    cb(res);
}

function login(req: LoginRequest, cb: (res: LoginResponse) => void): void {
    socket.on('login', (res: LoginResponse) => afterLogin(res, cb));
    socket.emit('login', req);
};

export { login };