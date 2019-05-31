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
		this.title = 'HorribleDungeon'
		this.description = 'It is not scary... just bad.'
		
		this.areas = [];
		this.area = undefined;
		
		/* for later...
		this.player1 = new Player(); // change this
		this.player2 = new Player(); // change this
		this.items = []; // should they start with any items
		this.Areas = [new Area()]; // change this
		this.currArea = 0; // players start in starting Area
		*/
	}
	
	// getter/setter for Area title
	// note Dungeon name should not contain spaces
	getTitle(): string {
		if (/\s/.test(this.title)) {
			console.log(`Warning whiteSpace detected in "${this.title}"`);
		}
		return this.title;
	}
	setTitle(newTitle: string): void {
		if (/\s/.test(newTitle)) {
			console.log(`Warning whiteSpace detected in "${newTitle}"`);
		}
		this.title = newTitle;
	}
	
	// add area
	addArea(a: Area): boolean {
		
		return false; 
	}
	
	// get area (broken)
	getArea(n: number): Area {
		return this.area;
	}
	
	// has Area
	hasArea(target: string): number {
		let i = this.areas.findIndex((a) => {
			return a.getTitle() === target;
		});
		if (i < 0) {
			console.log(`${target}" does not exisit in the dungeon...`);
		}
		return i;
	}
	
	// remove area
	removeArea(target: string): boolean {
		let i = this.hasArea(target);
		if (i > -1) {
			
			return true
		}
		return false;
	}
	
	// getter/setter for Area description
	getDescription(): string { return this.description; }
	setDescription(newDesc: string): void { this.description = newDesc; }
	
	/*
	enter room >> will enter room if room exisits
	*/
	parseCommand(command:string): void {
		// split on spaces and only 4 arguments [cmd object target JunkThatIsIgrnored]
		let cmd = command.split(' ', 3);
		switch (cmd[0]) {
			case 'enter':
				this.enterRoom(cmd[1]);
				break;
			default:
				console.log(`error unknown command "${cmd[0]}"`);
		}
	}
	
	enterRoom(target: string): void {
		let i = this.hasArea(target);
		if (i > -1) {
			this.area.leave();
			this.area = this.areas[i];
			this.area.enter();
		}
	}
}
export default Dungeon;