import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

// our imports/files
import {Player, PlayerList} from './components/player';
import {Dungeon, DungeonFactory} from './components/dungeon';

interface DumpProp {
	s: string;
	d: string;
}

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
	
	private emit(socket: socketIo.Socket, type: string, res: DumpProp): void {
		/*
		console.log(`socket.id: ${socket.id}`);
		console.log(`emit type: ${type}`);
		console.log(`str res.s: ${res.s}`);
		console.log(`str res.d: ${res.d}`);
		*/
		socket.emit(type, res);
	}

    private listen(): void {
		// listen on port
		this.server.listen(this.port, () => {
			console.log(`Running server on port ${this.port}`);
		});
		
		// handle connections to server
		this.io.on('connect', (socket: socketIo.Socket) => {
			//let player = undefined;
			console.log('server socket connect');
			this.emit(socket, 'connected', {
				s: socket.id,
				d: 'web client connected',
			});
			
			// -------------------------------------------
			// add player to server
			// -------------------------------------------
			socket.on('login', (req: DumpProp) => {
				console.log('server socket login');
				/*console.log(req.s);
				console.log(req.d);
				*/
				let p = new Player(req.s, req.d);
				if (this.players.addPlayer(p) === true) {
					this.emit(socket, 'login', {
						s: 'success',
						d: 'Thou Hast Chosen Goodly!',
					});
				} else {
					this.emit(socket, 'login', {
						s: 'error',
						d: 'Thou Hast Chosen Poorly! Try a new name.',
					});
				}
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
				/*if (player) {
					console.log('player disconnected');
				}*/
			});
		});
	}
}