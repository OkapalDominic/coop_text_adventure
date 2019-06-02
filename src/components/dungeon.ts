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
		return this.players.addPlayer(p);
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
		}
	}
	
	commandEnter(arg: string, p: Player): void {
		if (this.hasArea(arg) === true) {
			const a = this.areas.getArea(arg);
			console.log('enter area ', arg)
			/*
			need logic to set the player to area
			*/
			return;
		}
		console.log(`"Unable to find room "${arg}" to enter...`);
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