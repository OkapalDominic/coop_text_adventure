import {Entity} from './entity';
import {Player, PlayerList} from './player';
import {Area, AreaList} from './area';
import {Item} from './item';

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
			p.getSocket().emit('infoDungeon', {
				s: 'players',
				d: this.players.getPlayerNames().join(' '),
			});
			p.getSocket().emit('infoDungeon', {
				s: 'hints',
				d: 'I need a way to do hints',
			});
			p.getSocket().emit('infoDungeon', {
				s: 'items',
				d: p.getItemNames().join(' '),
			});
			p.getSocket().emit('infoDungeon', {
				s: 'areas',
				d: p.getCurrentArea().getConnectedAreaNames().concat(p.getCurrentArea().getItemNames()).join(' '),
			});
		}
		return b;
	}	
	hasPlayer(s: string): boolean {
		return this.players.hasPlayer(s);
	}
	removePlayer(s: string): void {
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
				// see if current area has item to pickup
				break
			case 'drop':
				// see if player has item to drop into area
				break
			case '':
				// put logic here
				break
			default:
				console.log(`error unknown command "${cmd[0]}"`);
				p.getSocket().emit('sendCommand', {
					s: 'error',
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
			p.getSocket().emit('sendCommand', {
				s: 'success',
				d: `entered area "${arg}"`,
			});
			// update client areas
			p.getSocket().emit('infoDungeon', {
				s: 'areas',
				d: p.getCurrentArea().getConnectedAreaNames().concat(p.getCurrentArea().getItemNames()).join(' '),
			});
		} else {
			console.log(`Unable to find room "${arg}" to enter...`);
			p.getSocket().emit('sendCommand', {
				s: 'error',
				d: `Unable to find room "${arg}" to enter...`,
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