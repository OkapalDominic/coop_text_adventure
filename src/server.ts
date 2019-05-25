import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { LoginRequest, LoginResponse } from './api_objects/login_api';
import Player from './components/player';
import Players from './components/players';

export class AdventureServer {
    public static readonly PORT: number = 7777;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private players: Players;

    constructor() {
        this.players = new Players();
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
            // Create new player object on this connection
            var player: Player = new Player();
            player.sessionKey(socket.id);
            player.connected(true);

            socket.on('login', (req: LoginRequest) => {
                //// This should be at the start of every socket.on ////
                if (req.sessionKey && req.sessionKey.length > 0) {
                    // Previous player
                    player.sessionKey(req.sessionKey);
                }
                ////////////////////////////////////////////////////////
                let res: LoginResponse = new LoginResponse();
                res.sessionKey = player.sessionKey();

                if(this.players.add(player, req.username)) {
                    res.success = true;
                    socket.emit('login', res);
                } else {
                    res.success = false;
                    socket.emit('login', res);
                }
            });

            socket.on('disconnect', () => {
                this.players.disconnected(player);
            });
        });
    }
}