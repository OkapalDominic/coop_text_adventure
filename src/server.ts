import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

// our imports/files
import {Dungeon} from './components/dungeon';

export class AdventureServer {
	private port: string | number;
	private server: Server;
    private io: SocketIO.Server;
	
	private dungeons: ???;
	//private players: ???;
	
    constructor() {
		// choose port
		this.port = process.env.PORT || AdventureServer.PORT;
		// create server
		this.server = createServer(express());
		// set up socketIo
		this.io = socketIo(this.server);
		
		// set up local data
		this.dungeons = ???;
		// create a dungeon
		//this.players = ???;
		
		// listen for messages
		this.listen();
    }

    private listen(): void {
		// listen on port
		this.server.listen(this.port, () => {
			console.log(`Running server on port ${this.port}`);
		});
		
		// handle connections to server
		this.io.on('connect', (socket: socketIo.Socket) => {
			let player = undefined;
			
			// -------------------------------------------
			// add player to server
			// -------------------------------------------
			socket.on('login', (req: ???) => {
				// create player (req.user, socket.id, socket)
				// add player
				// emit connection message
			});
			
			// -------------------------------------------
			// add player to dungeon
			// -------------------------------------------
			socket.on('enterDungeon', (req:) => {
				
			});
			
			// -------------------------------------------
			// send command to dungeon player is in
			// -------------------------------------------
			socket.on('sendCommand', (req:) => {
				
			});
			
			// -------------------------------------------
			// disconnect player
			// -------------------------------------------
			socket.on('disconnect', () => {
				
			});
		});
	}
}