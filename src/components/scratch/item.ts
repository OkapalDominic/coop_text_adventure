//items that can be picked up/used

class Item {
	// name/description dungeon
	private title: string; 
	private description: string;
	
	constructor() {
		this.title = 'BoringItem';
		this.description = 'Seems to be broken';
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
}

export default Item;