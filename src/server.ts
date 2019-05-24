import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { LoginRequest } from './api_objects/login_api';

export class AdventureServer {
    public static readonly PORT: number = 7777;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private usernames: string[] = [];

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private createApp(): void {
        this.app = express();
    }

    private config(): void {
        this.port = process.env.PORT || AdventureServer.PORT;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: socketIo.Socket) => {
            console.log('Connected client: %s', socket.id);
            socket.on('login', (msg: LoginRequest) => {
                console.log('username %s', msg.username);
                if(this.usernames.indexOf(msg.username) === -1) {
                    this.usernames.push(msg.username);
                    this.io.emit('login', {success: true});
                } else {
                    this.io.emit('login', {success: false});
                }
            });

            socket.on('disconnect', () => {
                console.log('%s disconnected.', socket.id);
            });
        });
    }
}
