import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { LoginRequest, LoginResponse, Connected } from './api_objects/login_api';
import Player from './components/player';
import Players from './components/players';
import Rooms from './components/rooms';
import Room from './components/room';
import { LeftRoom, ReadyToPlay } from './api_objects/room_messages';

export class AdventureServer {
    public static readonly PORT: number = 7777;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private players: Players;
    private rooms: Rooms;

    constructor() {
        this.players = new Players();
        this.rooms = new Rooms();
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
            console.log('Running server on port %s', this.port);  // eslint-disable-line no-console
        });

        this.io.on('connect', (socket: socketIo.Socket) => {
            // Create new player object on this connection
            var player: Player = this.players.create(socket.id, socket);
            socket.emit('connected', new Connected(player.sessionKey()));

            socket.on('login', (req: LoginRequest) => {
                // Update sessionKey incase client is reconnecting
                player.sessionKey(req.sessionKey);

                // Remove player from room if they were in one before
                let prevPlayer: Player = this.rooms.remove(player);
                if(prevPlayer !== undefined) {
                    // Tell other player(s) in room, they left
                    this.io.to(prevPlayer.room()).emit('playerLeft', new LeftRoom(prevPlayer.username()));
                }

                // Attempt to add player
                let added: boolean;
                let res: LoginResponse = new LoginResponse();

                [added, player] = this.players.add(player, req.username);
                if (added) {
                    res.success = true;
                    let room: Room = this.rooms.add(player, this.io);
                    socket.join(room.name());
                    res.room = room.name();
                    res.players = room.players();
                    this.io.to(room.name()).emit('login', res);
                } else {
                    res.success = false;
                    res.room = undefined;
                    res.players = undefined;
                    socket.emit('login', res);
                }
            });

            socket.on('readyToPlay', (req: ReadyToPlay) => {
                player.ready(req.ready);
                this.io.to(player.room()).emit('readyToPlay', req);
                let room: Room = this.rooms.getRoom(player.room());
                if(req.ready && room.ready()) {
                    room.inProgress(true);
                    room.startGame();
                }
            });

            socket.on('disconnect', () => {
                this.players.disconnected(player, this.removeOnDisconnect, this);
            });
        });
    }

    /**
     * 
     * @param disconnected -- If this should disconnect the player
     * @param player -- The player in danger of being disconnected
     * @param t -- this, because it's being called as a callback
     */
    private removeOnDisconnect(disconnected: boolean, player: Player, t: AdventureServer): void {
        if (disconnected) {
            let p: Player = t.rooms.remove(player);
            if (p !== undefined) {
                t.io.to(p.room()).emit('playerLeft', new LeftRoom(p.username()));
            }
        }
    }
}