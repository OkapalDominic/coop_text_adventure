import Entity from './entity.ts'
import Player from './player.ts'
import Area from './area.ts'
import Item from './item'

// manages the current Dungeon
export class Dungeon{
	// name/description dungeon
	private title: string; 
	private description: string;
	
	// all Areas currently in the Dungeon
	private areas: Area[];
	private currArea: number;
	
	/* for later...
	// players in this game session
	private player1: Player;
	private player2: Player;
	
	// items that the players carry
	private items: Item[];
	*/
	
	constructor() {
		this.title = 'Horrible Dungeon'
		this.description = 'It is not scary... just bad.'
		
		/* for later...
		this.player1 = new Player(); // change this
		this.player2 = new Player(); // change this
		this.items = []; // should they start with any items
		this.Areas = [new Area()]; // change this
		this.currArea = 0; // players start in starting Area
		*/
	}
	
	ParseCommand(command:string): void {
		// split on spaces and only 4 arguments [cmd object target JunkThatIsIgrnored]
		let cmd = command.split(' ', 3);
		switch (cmd) {
			case 'enter':
				this.areas.findIndex()
			default:
				console.log('error unknown command')
		}
	}
}