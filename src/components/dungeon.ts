import {Entity} from './entity';
import {Player, PlayerList} from './player';
import {Area, AreaList} from './area';
import {Item} from './item';

interface DumpProp {
	s: string;
	d: string;
}

// ----------------------------------
// holds information on a dungeon
// ----------------------------------
export class Dungeon extends Entity {
	// variables unique to Dungeon
	private areas: AreaList;
	private startArea: Area;
	private players: PlayerList;
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string) {
		super(n, d);
		
		this.areas = new AreaList();
		
		this.startArea = undefined;
		
		this.players = new PlayerList();
	}
	
	//------------------------------------------------------------
	// add/remove players in dungeon
	//------------------------------------------------------------
	addPlayer(p: Player): boolean {
		console.log(`player "${p.getName()}" attempting to enter dungeon "${this.name}"`);
		let b = this.players.addPlayer(p);
		if (b === true) {
			// send state for client
			this.sendMessageAll('sendCommand', {
				s: p.getDescription(),
				d: `has joined ${this.getName()}`,
			});
			this.sendPlayers();
			this.sendHints(p);
			this.sendInventory(p);
			this.sendAreas(p);
			this.sendItems(p);
		}
		return b;
	}	
	hasPlayer(s: string): boolean {
		return this.players.hasPlayer(s);
	}
	removePlayer(s: string): void {
		if (this.players.hasPlayer(s) === true) {
			this.sendMessageAll('sendCommand', {
				s: this.players.getPlayer(s).getDescription(),
				d: `Has left the dungeon"`,
			});
		}
		this.players.removePlayer(s);
	}
	
	//------------------------------------------------------------
	// add/remove area in dungeon
	//------------------------------------------------------------
	addArea(a: Area): boolean {
		if (this.startArea === undefined) {
			this.startArea = a;
		}
		return this.areas.addArea(a);
	}
	hasArea(s: string): boolean {
		return this.areas.hasArea(s);
	}
	getStartArea(): Area {
		return this.startArea;
	}
	removeArea(s: string): void {
		if (this.startArea === this.areas.getArea(s)) {
			console.log('You are removing starting area from dungeon... oops!');
		}
		return this.areas.removeArea(s);
	}	
	
	//------------------------------------------------------------
	// methods to emit messages to players in dungeon
	//------------------------------------------------------------
	sendMessage(p: Player, s: string, dp: DumpProp): void {
		p.sendMessage(s, dp);
	}
	
	sendMessageRoom(p: Player, s: string, dp: DumpProp): void {
		this.players.getRawArray().forEach((i) => {
			if (p.getCurrentArea().getName() === i.getCurrentArea().getName()) {
				i.sendMessage(s, dp);
			}
		});
	}
	
	sendMessageAll(s: string, dp: DumpProp): void {
		this.players.getRawArray().forEach((p) => {
			p.sendMessage(s, dp);
		});
	}
	
	//------------------------------------------------------------
	// methods to send dungeon info to players in dungeon
	//------------------------------------------------------------
	sendPlayers(): void {
		//console.log('sendPlayers');
		this.players.getRawArray().forEach((p) => {
			//console.log(`\t${p.getDescription()}-${p.getCurrentArea().getName()}`)
			let str: string[] = [];
			this.players.getRawArray().forEach((pp) => {
				//console.log(`\t${pp.getDescription()}-${pp.getCurrentArea().getName()}`)
				if (p.getCurrentArea().getName() === pp.getCurrentArea().getName()) {
					//console.log('\t\tpush')
					str.push(pp.getDescription());
				}
			});
			//console.log('\t\t', str);
			if (str.length > 0) {
				this.sendMessage(p, 'infoDungeon', {
					s: 'players',
					d: str.join('\n'),
				});
			}
		});
	}
	sendHints(p: Player): void {
		this.sendMessage(p, 'infoDungeon', {
			s: 'hints',
			d: 'I need a way to do hints',
		});
	}
	sendInventory(p: Player): void {
		this.sendMessage(p, 'infoDungeon', {
			s: 'inventory',
			d: p.getItemNames().join('\n'),
		});
	}
	sendAreas(p: Player): void {
		this.sendMessageRoom(p, 'infoDungeon', {
			s: 'areas',
			d: p.getCurrentArea().getConnectedAreaNames().join('\n'),
		});
	}
	sendItems(p: Player): void {
		this.sendMessageRoom(p, 'infoDungeon', {
			s: 'items',
			d: p.getCurrentArea().getItemNames().join('\n'),
		});
	}
	
	//------------------------------------------------------------
	// user command logic
	//------------------------------------------------------------
	parseCommand(command: string, p: Player): void {
		if (this.players.hasPlayer(p.getName()) === false) {
			console.log('recived cmd from player not in dungeon');
			return;
		}
		// split on spaces and only 4 arguments [cmd object target JunkThatIsIgrnored]
		let cmd = command.split(' ', 3);
		switch (cmd[0]) {
			case 'enter':
				this.commandEnter(cmd[1], p);
				break;
			case 'pickup':
				this.commandPickup(cmd[1], p);
				break;
			case 'use':
				this.commandUse(cmd[1], p);
				break;
			case 'drop':
				this.commandDrop(cmd[1], p);
				break;
			case 'chat':
				this.commandChat(command, p);
				break;
			default:
				console.log(`error unknown command "${cmd[0]}"`);
				this.sendMessage(p, 'sendCommand', {
					s: p.getDescription(),
					d: `error unknown command "${cmd[0]}"`,
				});
		}
	}
	
	commandEnter(arg: string, p: Player): void {
		if (this.hasArea(arg)) {
			const a = this.areas.getArea(arg);
			console.log(`enter area "${arg}"`);
			// logic goes here
			p.enterArea(a);
			// tell client about success
			this.sendMessageRoom(p, 'sendCommand', {
				s: p.getDescription(),
				d: `entered area "${arg}"`,
			});
			// update client areas
			this.sendPlayers();
			this.sendAreas(p);
			this.sendItems(p);
		} else {
			console.log(`Unable to find room "${arg}" to enter...`);
			this.sendMessage(p, 'sendCommand', {
				s: p.getDescription(),
				d: `Unable to find room "${arg}" to enter...`,
			});
		}
	}
	
	commandPickup(arg: string, p: Player): void {
		if (p.getCurrentArea().hasItem(arg)) {
			const i = p.getCurrentArea().getItem(arg);
			console.log(`Picked up item "${arg}"`);
			i.onPickUp(p);
			this.sendMessageRoom(p, 'sendCommand', {
				s: p.getDescription(),
				d: `Picked up item "${arg}"`,
			});
			this.sendInventory(p);
			this.sendItems(p);
		} else {
			console.log(`Unable to find item "${arg}" to pickup...`);
			this.sendMessage(p, 'sendCommand', {
				s: p.getDescription(),
				d: `Unable to find item "${arg}" to pickup...`,
			});
		}
	}
	
	commandUse(arg: string, p: Player): void {
		if (p.hasItem(arg)) {
			const i = p.getItem(arg);
			console.log(`Used item "${arg}"`);
			i.onUse();
			if (i.getName() === 'Apple' && p.getCurrentArea().getName() === 'StartRoom') {
				this.sendMessage(p, 'winner', {
					s: 'You Have Won',
					d: 'By eating an Apple in the StartRoom',
				});
				p.exitDungeon();
				this.sendMessageAll('sendCommand', {
					s: p.getDescription(),
					d: 'Is a true winner! What is taking you so long?'
				});
				this.sendPlayers();
			} else {
				this.sendMessageRoom(p, 'sendCommand', {
					s: p.getDescription(),
					d: `Used item "${arg}"`,
				});
				this.sendInventory(p);
			}
		} else {
			console.log(`Unable to find item "${arg}" to use...`);
			this.sendMessage(p, 'sendCommand', {
				s: p.getDescription(),
				d: `Unable to find item "${arg}" to use...`,
			});
		}
	}
	
	commandDrop(arg: string, p: Player): void {
		if (p.hasItem(arg)) {
			const i = p.getItem(arg);
			console.log(`Dropped item "${arg}"`);
			i.onDrop(p.getCurrentArea());
			this.sendMessageRoom(p, 'sendCommand', {
				s: p.getDescription(),
				d: `Dropped up item "${arg}"`,
			});
			this.sendInventory(p);
			this.sendItems(p);		
		} else {
			console.log(`Unable to find item "${arg}" to drop...`);
			this.sendMessage(p, 'sendCommand', {
				s: p.getDescription(),
				d: `Unable to find item "${arg}" to drop...`,
			});
		}
	}
	
	commandChat(arg: string, p: Player): void {
		let str = arg.slice(5);
		if (str.length > 0) {
			console.log(`chat: ${str}`);
			this.sendMessageRoom(p, 'sendCommand', {
				s: p.getDescription(),
				d: str,
			});
		} else {
			console.log(`no message to send...`);
			this.sendMessage(p, 'sendCommand', {
				s: p.getDescription(),
				d: `no message to send...`,
			});
		}
	}
}

// ----------------------------------
// holds an array of Dungeon
// ----------------------------------
export class DungeonList {
	private dungeons: Dungeon[];
	
	constructor() {
		this.dungeons = [];
	}
	
	// ----------------------------------
	// modify PlayerList
	// ----------------------------------
	addDungeon(d: Dungeon): boolean {
		if (this.hasDungeon(d.getName()) === false) {
			this.dungeons.push(d);
			return true;
		}
		console.log(`This collection already has dungeon with name "${d.getName()}"`);
		return false;
	}
	
	hasDungeon(s: string): boolean {
		if (Entity.indexEntity(s, this.dungeons) > -1) {
			return true;
		}
		return false;
	}
	
	getDungeon(s: string): Dungeon {
		let d = Entity.indexEntity(s, this.dungeons);
		if (d > -1) {
			return this.dungeons[d];
		}
		console.log(`"Unable to find Dungeon named "${s}" in this collection... Did you try the right collection?`);
		return undefined;
	}
	
	getDungeonNames(): string[] {
		let names: string[] = [];
		this.dungeons.forEach((d) => {
			names.push(d.getName());
		});
		return names;
	}
	
	removeDungeon(s: string): void {
		let d = Entity.indexEntity(s, this.dungeons);
		if (d > -1) {
			this.dungeons.splice(d, 1);
		}
	}
}

// ----------------------------------
// class with static methods to create dungeons
// ----------------------------------
export class DungeonFactory {
	static testDungeon(name?: string): Dungeon {
		let n = 'TestDungeon';
		if (name) {
			n = name;
		}
		
		let d = new Dungeon(n, 'A dungeon used for testing. Watch out for spontaneous nonexistance.');
		
		let a0 = new Area('StartRoom', 'A very good place to start.', d);
		let a1 = new Area('EmptyRoom', 'Nothing in this room.', d);
		let a2 = new Area('ItemRoom', 'Contains an item.', d);
		
		let i = new Item('Apple', 'It may be able to heal you! Probably not though.', a2);
		
		DungeonFactory.symmetricConnection(a0,a1);
		DungeonFactory.symmetricConnection(a1,a2);
		
		return d;
	}
	
	private static oneWayConnection(a1: Area, a2: Area): void {
		a1.addConnectedArea(a2);
	}
	private static symmetricConnection(a1: Area, a2: Area): void {
		a1.addConnectedArea(a2);
		a2.addConnectedArea(a1);
	}
}