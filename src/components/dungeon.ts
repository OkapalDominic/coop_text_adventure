import {Entity} from './entity';
import {Player, PlayerList} from './player';
import {Area, AreaList} from './area';

// manages the current Dungeon
export class Dungeon extends Entity {
	// variables unique to Dungeon
	private areas: AreaList;
	private startArea: Area;
	private players: PlayerList;
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string) {
		super(n, d, undefined);
		
		this.areas = new AreaList();
		
		this.startArea = undefined;
		
		this.players = new PlayerList();
	}
	
	//------------------------------------------------------------
	// add/remove players in dungeon
	//------------------------------------------------------------
	addPlayer(p: Player): boolean {
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
		return this.areas.addArea(a);
	}
	hasArea(s: string): boolean {
		return this.areas.hasArea(s);
	}
	removeArea(s: string): void {
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
				this.commandEnter(cmd[1]);
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
			const a = this.getArea(arg);
			console.log('enter area ', arg)
			//a.onEnter();
			return;
		}
		console.log(`"Unable to find room "${arg}" to enter...`);
	}
}