// areas that players can go to

class Area {
	// name/description Area
	private title: string;
	private description; string;
	
	// what other areas can be accessed from this area
	private connectedAreas: Area[];
	
	constructor() {
		this.title = 'Boring area...';
		this.description = 'Nothing to do';
		this.connectedAreas = [];
	}
	
	// getter/setter for Area title
	getTitle(): string { return this.title; }
	setTitle(newTitle: string): void { this.title = newTitle; }
	
	// getter/setter for Area description
	getDescription(): string { return this.description; }
	setDescription(newDesc: string): void { this.description = newDesc; }
	
	
	// should be called when entering an area
	enter() { 
		console.log(`You have entered ${this.title}`);
		console.log(this.description);
	}
	
	// should be called when leaving an area
	leave() {
		console.log(`You have left ${this.title}`);
	}
}

export default Area;