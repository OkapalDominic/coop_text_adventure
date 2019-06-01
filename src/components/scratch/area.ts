// areas that players can go to

export class Area {
	// name/description Area
	private title: string;
	private description; string;
	
	// what other areas can be accessed from this area
	private connectedAreas: Area[];
	
	constructor() {
		this.title = 'BoringArea';
		this.description = 'Nothing to do';
		this.connectedAreas = [];
	}
	
	//------------------------------------------------------------
	// title description
	//------------------------------------------------------------
		
	// getter/setter for Area title
	// note area name should not contain spaces
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
	
	// getter/setter for Area description
	getDescription(): string { return this.description; }
	setDescription(newDesc: string): void { this.description = newDesc; }
	
	//------------------------------------------------------------
	// item adding/getting/checking/removing
	//------------------------------------------------------------
		
	// add item
	addItem(i: Item): boolean {
		return true;
	}
	
	// get item
	getItem(n: number): Item {
		return this.items[0];
	}
	
	// has item
	hasItem(target: string): number {
		return -1;
	}
	
	// remove item
	removeItem(): boolean {
		return false;
	}
		
	//------------------------------------------------------------
	// cmd logic
	//------------------------------------------------------------
		
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