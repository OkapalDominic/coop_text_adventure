import Area from './area'

// manages the current Dungeon
export class Dungeon{
	// name/description dungeon
	private title: string; 
	private description: string;
	
	// all Areas currently in the Dungeon
	private areas: Area[];
	private area: Area;
	
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
	
	/*
	enter room >> will enter room if room exisits
	*/
	ParseCommand(command:string): void {
		// split on spaces and only 4 arguments [cmd object target JunkThatIsIgrnored]
		let cmd = command.split(' ', 3);
		switch (cmd[0]) {
			case 'enter':
				this.enter(cmd[1]);
			default:
				console.log('error unknown command');
		}
	}
	
	enter(target: string): void {
		let i = this.areas.findIndex((a) => {
			return a.getTitle() === target;
		});
		if (i > -1) {
			this.area.leave();
			this.area = this.areas[i];
			this.area.enter();
		} else {
			console.log(`${target} does not exisit in the dungeon... You remain where you are.`);
		}
	}
}
export default Dungeon;