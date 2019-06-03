import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

// our imports/files
import {Player, PlayerList} from './components/player';
import {Dungeon, DungeonList, DungeonFactory} from './components/dungeon';

export interface DumpProp {
	s: string;
	d: string;
}

export class AdventureServer {
    private app: express.Application;
	private server: Server;
    private io: SocketIO.Server;
	private port: string | number;
	
	private dungeons: DungeonList;
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
		this.dungeons = new DungeonList();
		this.dungeons.addDungeon(DungeonFactory.testDungeon());
		this.dungeons.addDungeon(DungeonFactory.testDungeon('Derpgeon'));
		this.dungeons.addDungeon(DungeonFactory.testDungeon('AnotherDungeon'));
		this.players = new PlayerList();
		
		// listen for messages
		this.listen();
    }
	
	public getApp(): express.Application {
        return this.app;
    }
	
	private emit(p: Player, type: string, res: DumpProp): void {
		/*
		console.log(`socket.id: ${socket.id}`);
		console.log(`emit type: ${type}`);
		console.log(`str res.s: ${res.s}`);
		console.log(`str res.d: ${res.d}`);
		*/
		p.getSocket().emit(type, res);
	}

    private listen(): void {
		// listen on port
		this.server.listen(this.port, () => {
			console.log(`Running server on port ${this.port}`);
		});
		
		// handle connections to server
		this.io.on('connect', (socket: socketIo.Socket) => {
			console.log('server socket connect');
			socket.emit('connected', {
				s: 'web client connected',
				d: socket.id,
			});
			
			// -------------------------------------------
			// add player to server
			// -------------------------------------------
			socket.on('login', (req: DumpProp) => {
				console.log('server socket login');
				/*console.log(req.s);
				console.log(req.d);
				*/
				let p = new Player(req.s, req.d, socket);
				if (this.players.addPlayer(p) === true) {
					this.emit(p, 'login', {
						s: 'success',
						d: 'Thou Hast Chosen Goodly!',
					});
					this.emit(p, 'infoDungeon', {
						s: 'dungeons',
						d: this.dungeons.getDungeonNames().join(' '),
					});
				} else {
					this.emit(p, 'login', {
						s: 'error',
						d: 'Thou Hast Chosen Poorly! Try a new name.',
					});
				}
			});
			
			// -------------------------------------------
			// add player to dungeon
			// -------------------------------------------
			socket.on('joinDungeon', (req: DumpProp) => {
				console.log('server socket joinDungeon');
				//console.log(req.s);
				//console.log(req.d);
				let p = this.players.getPlayer(req.s);
				let d = this.dungeons.getDungeon(req.d);
				if (p !== undefined && d !== undefined) {
					if (p.enterDungeon(d) === true) {
						console.log(`${req.s} added to ${req.d}`);
						this.emit(p, 'joinDungeon', {
							s: 'success',
							d: d.getName(),
						});
					} else {
						console.log('Unable to add player to dungeon... oops.');
						this.emit(p, 'joinDungeon', {
							s: 'error',
							d: 'Unable to add player to dungeon... oops.',
						});
					}
				} else {
					console.log('Unable to find player and/or dungeon.');
					this.emit(p, 'joinDungeon', {
						s: 'error',
						d: 'Either you or the dungeon does not exits.',
					});
				}
			});
			
			// -------------------------------------------
			// send command to dungeon player is in
			// -------------------------------------------
			socket.on('sendCommand', (req: DumpProp) => {
				console.log('server socket sendCommand');
				let p = this.players.getPlayer(req.s);
				if (p !== undefined) {
					let d = p.currentDungeon();
					if (d !== undefined) {
						console.log(`"${req.d}" sent to "${d.getName()}" by "${p.getDescription()}"`);
						d.parseCommand(req.d, p);
						/*this.emit(socket, 'sendCommand', {
							s: 'success',
							d: req.d,
						});*/
					} else {
						console.log('player is not in dungeon');
						this.emit(p, 'sendCommand', {
							s: 'error',
							d: 'Player not in dungeon',
						});
					}
				} else {
					console.log('Unable to find player');
					this.emit(p, 'sendCommand', {
						s: 'error',
						d: 'Unknown player',
					});
				}
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