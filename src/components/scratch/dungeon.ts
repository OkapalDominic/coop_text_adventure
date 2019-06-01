import Entity from './entity'
import Player from './player'
import Area from './area'

// manages the current Dungeon
export class Dungeon extends Entity {
	// variables unique to Dungeon
	private areas: Area[];
	private startArea: Area;
	private players: Player[];
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string) {
		super(n, d, undefined);
		
		this.areas = [];
		this.addState('areas', this.areas);
		
		this.startArea = undefined;
		//this.addState('startArea', this.startArea);
		
		this.players = [];
		this.addState('players', this.players);
	}
	
	//------------------------------------------------------------
	// add/get area to/in dungeon
	//------------------------------------------------------------
	addArea(a: Area): boolean {
		if (this.hasArea(a.getName()) === false) {
			this.areas.push(a); // can't reassign refrence (ie concat) without breaking entity.state backing
			if (this.startArea === undefined) {
				this.startArea = a;
			}
			return true;
		}
		console.log(`"${this.name}" already contains a room with name "${a.getName()}"`);
		return false;
	}
	
	hasArea(s: string): boolean {
		if (Entity.indexEntity(s, this.areas) > -1) {
			return true;
		}
		return false;
	}
	
	getArea(s: string): Area {
		let i = Entity.indexEntity(s, this.areas);
		if (i > -1) {
			return this.areas[i];
		}
		console.log(`"${this.name}" does not contain a room with name "${s}"`);
		return undefined;
	}
	
	//------------------------------------------------------------
	// add/get Player to/in Player
	//------------------------------------------------------------
	addPlayer(p: Player): boolean {
		if (this.hasPlayer(p.getName()) === false) {
			this.players.push(p); // can't reassign refrence (ie concat) without breaking entity.state backing
			return true;
		}
		console.log(`"${this.name}" already has player with name "${p.getName()}"`);
		return false;
	}
	
	hasPlayer(s: string): boolean {
		if (Entity.indexEntity(s, this.players) > -1) {
			return true;
		}
		return false;
	}
	
	getPlayer(s: string): Player {
		let i = Entity.indexEntity(s, this.players);
		if (i > -1) {
			return this.players[i];
		}
		console.log(`"${this.name}" does not have player with name "${s}"`);
		return undefined;
	}
	
	//------------------------------------------------------------
	// user command logic
	// how tell what user it was / user to update...(add player arg?)
	//------------------------------------------------------------
	parseCommand(command: string): void {
		// split on spaces and only 4 arguments [cmd object target JunkThatIsIgrnored]
		let cmd = command.split(' ', 3);
		switch (cmd[0]) {
			case 'enter':
				// test if an area exists to enter
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
}
export default Dungeon;