import Entity from './entity'
import Player from './player'
import Area from './area'

// manages the current Dungeon
export class Dungeon extends Entity {
	// variables unique to Dungeon
	private areas: Area[];
	private players: Player[];
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string) {
		super(n, d, undefined);
		
		this.areas = [];
		this.addState('areas', areas);
		
		this.players = [];
		this.addState('players', players);
	}
	
	//------------------------------------------------------------
	// add/get area to/in dungeon
	//------------------------------------------------------------
	addArea(a: Area): boolean {
		if (hasArea(a.getName() === false)) {
			this.areas = this.areas.concat([a]);
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