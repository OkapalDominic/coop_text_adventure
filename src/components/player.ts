import {Socket} from 'socket.io';

import {Entity} from './entity';
import {Dungeon} from './dungeon';
import {Area} from './area';
import {Item, ItemList} from './item';

interface DumpProp {
	s: string;
	d: string;
}

// ----------------------------------
// manages details about Player
// note:
//		name should hold sessionKey
//		description should hold username
// ----------------------------------
export class Player extends Entity {
	// variables unique to Player
	private socket: Socket;
	private dungeon: Dungeon;
	private currentArea: Area;
	private items: ItemList;
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string, s: Socket) {
		super(n, d);
		
		this.socket = s;
		
		this.dungeon = undefined;
		
		this.currentArea = undefined;
		
		this.items = new ItemList();
	}
	
	// ----------------------------------
	// get player socket
	// ----------------------------------
	getSocket(): Socket {
		return this.socket;
	}
	
	sendMessage(s: string, dp: DumpProp): void {
		this.getSocket().emit(s, dp);
	}
	
	// ----------------------------------
	// change dungeon player is in
	// ----------------------------------
	enterDungeon(d: Dungeon): boolean {
		if (d !== this.dungeon) {
			if (this.dungeon !== undefined) {
				this.dungeon.removePlayer(this.name);
			}
			this.dungeon = d;
			this.enterArea(d.getStartArea());
		}
		return this.dungeon.addPlayer(this);
	}
	currentDungeon(): Dungeon {
		return this.dungeon;
	}
	exitDungeon(): void {
		this.dungeon.removePlayer(this.name);
		this.dungeon = undefined;
		this.currentArea = undefined;
	}
	
	// ----------------------------------
	// modify area player player is in
	// ----------------------------------
	enterArea(a: Area): boolean {
		if (a !== this.currentArea) {
			if (this.currentArea !== undefined) {
				this.currentArea.OnExit();
			}
			this.currentArea = a;
		}
		this.currentArea.OnEnter();
		return true;
	}
	getCurrentArea(): Area {
		return this.currentArea;
	}
	exitArea(): void {
		this.currentArea.OnExit();
	}
	
	// ----------------------------------
	// modify items player has
	// ----------------------------------
	addItem(i: Item): boolean {
		return this.items.addItem(i);
	}
	hasItem(s: string): boolean {
		return this.items.hasItem(s);
	}
	getItemNames(): string[] {
		return this.items.getItemNames();
	}
	removeItem(s: string): void {
		this.items.removeItem(s);
	}
}

// ----------------------------------
// holds an array of players
// ----------------------------------
export class PlayerList {
	private players: Player[];
	
	constructor() {
		this.players = [];
	}
	
	getRawArray(): Player[] {
		return this.players;
	}
	
	// ----------------------------------
	// modify PlayerList
	// ----------------------------------
	addPlayer(p: Player): boolean {
		if (this.hasPlayer(p.getName()) === false) {
			this.players.push(p);
			return true;
		}
		console.log(`This collection already has player with name "${p.getName()}"`);
		return false;
	}
	
	hasPlayer(s: string): boolean {
		if (Entity.indexEntity(s, this.players) > -1) {
			return true;
		}
		return false;
	}
	
	getPlayer(s: string): Player {
		let p = Entity.indexEntity(s, this.players);
		if (p > -1) {
			return this.players[p];
		}
		console.log(`"Unable to find Player named "${s}" in this collection... Did you try the right collection?`);
		return undefined;
	}
	
	getPlayerNames(): string[] {
		let names: string[] = [];
		this.players.forEach((p) => {
			names.push(p.getName());
		});
		return names;
	}
	
	getPlayerDescriptions(): string[] {
		let des: string[] = [];
		this.players.forEach((p) => {
			des.push(p.getDescription());
		});
		return des;
	}
	
	removePlayer(s: string): void {
		let p = Entity.indexEntity(s, this.players);
		if (p > -1) {
			this.players.splice(p, 1);
		}
	}
}