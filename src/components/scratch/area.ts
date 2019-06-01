// areas that players can go to

import Item from './item'

export class Area {
	// name/description Area
	private title: string;
	private description; string;
	
	// what other areas can be accessed from this area
	private connectedAreas: Area[];
	
	// items in the area that can be picked up
	private items: Item[];
	
	constructor() {
		this.title = 'BoringArea';
		this.description = 'Nothing to do';
		this.connectedAreas = [];
		this.items = [];
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
		this.items = this.items.concat([i]);
		console.log(`added "${i.getTitle()}" to "${this.title}.`);
		return true;
	}
	
	// get item
	getItem(n: number): Item {
		return this.items[n];
	}
	
	// has item
	hasItem(target: string): number {
		let n = this.items.findIndex((i) => {
			return i.getTitle() === target;
		});
		if (n < 0) {
			console.log(`"${target}" is not in "${this.title}"...`);
		}
		return n;
	}
	
	// remove item
	removeItem(target: string): boolean {
		let i = this.hasItem(target);
		if (i > -1) {
			const f = this.items.slice(0, i);
			const b = this.items.slice(i+1);
			this.items = f.concat(b);
			console.log(`removed "${target}" from "${this.title}`);
			return true;
		}
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