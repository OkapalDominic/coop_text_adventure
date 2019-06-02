import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

// our imports/files
import {Player, PlayerList} from './components/player';
import {Dungeon, DungeonFactory} from './components/dungeon';

export class AdventureServer {
    private app: express.Application;
	private server: Server;
    private io: SocketIO.Server;
	private port: string | number;
	
	private dungeons: Dungeon;
	private players: PlayerList
	
    constructor() {
		// create server
		this.app = express();
		this.server = createServer(this.app);
		// set up socketIo
		this.io = socketIo(this.server);
		// choose port
		this.port = process.env.PORT || 7777;
		
		// set up local data
		this.dungeons = DungeonFactory.testDungeon();
		this.players = new PlayerList();
		
		// listen for messages
		this.listen();
    }
	
	public getApp(): express.Application {
        return this.app;
    }

    private listen(): void {
		// listen on port
		this.server.listen(this.port, () => {
			console.log(`Running server on port ${this.port}`);
		});
		
		// handle connections to server
		this.io.on('connect', (socket: socketIo.Socket) => {
			let player = undefined;
			console.log('web client connected ' + socket.id);
			socket.emit('connected', socket.id);
			
			// -------------------------------------------
			// add player to server
			// -------------------------------------------
			socket.on('login', () => {
				console.log('server socket login');
			});
			
			// -------------------------------------------
			// add player to dungeon
			// -------------------------------------------
			socket.on('enterDungeon', () => {
				console.log('server socket enterDungeon');
			});
			
			// -------------------------------------------
			// send command to dungeon player is in
			// -------------------------------------------
			socket.on('sendCommand', () => {
				console.log('server socket sendCommand');
			});
			
			// -------------------------------------------
			// disconnect player
			// ignore disconnects???
			// -------------------------------------------
			socket.on('disconnect', () => {
				console.log('server socket disconnect');
				if (player) {
					console.log('player disconnected');
				}
			});
		});
	}
}