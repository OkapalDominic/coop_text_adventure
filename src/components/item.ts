import {Entity} from './entity';
import {Player} from './player';
import {Area} from './area';

type CallBack = (arg: Player | Area) => void;
type CallBackEmpty = () => void;

// ----------------------------------
// items that can be picked up/used
// ----------------------------------
export class Item extends Entity {
	// variables unique
	private owner: Player | Area;
	
	private bonPickUp: CallBack;
	private bonUse: CallBackEmpty;
	private bonDrop: CallBack;
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string, pa: Player | Area) {
		super(n, d);
		
		// set owner
		this.owner = pa;
		pa.addItem(this);
		
		// set some default behaviors
		this.bonPickUp = function(p: Player) {
			console.log(`You have picked up "${this.name}"!`);
			console.log(this.description);
			this.owner.removeItem(this.name);
			this.owner = p;
			this.owner.addItem(this);
		};
		
		this.bonUse = function() {
			console.log(`Used "${this.name}"... but it did nothing...`);
			this.owner.removeItem(this.name);
		};
		
		this.bonDrop = function(a: Area) {
			console.log(`You have dropped "${this.name}".`);
			this.owner.removeItem(this.name);
			this.owner = a;
			this.owner.addItem(this);
		};
	}
	
	// ----------------------------------
	// Modify the Item's behaviors
	// ----------------------------------
	setOnPickUp(f: CallBack): void {
		this.bonPickUp = f;
	}
	setOnUse(f: CallBackEmpty): void {
		this.bonUse = f;
	}
	setOnDrop(f: CallBack): void {
		this.bonDrop = f;
	}
	
	// ----------------------------------
	// Call the Item's set behaviors
	// ----------------------------------	
	onPickUp(p: Player): void {
		this.bonPickUp(p);
	}
	onUse(): void {
		this.bonUse();
	}
	onDrop(a: Area): void {
		this.bonDrop(a);
	}
}

// ----------------------------------
// holds an array of items
// ----------------------------------
export class ItemList {
	private items: Item[];
	
	constructor() {
		this.items = [];
	}
	
	// ----------------------------------
	// modify ItemList
	// ----------------------------------
	addItem(i: Item): boolean {
		this.items.push(i);
		return true;
	}
	
	hasItem(s: string): boolean {
		if (Entity.indexEntity(s, this.items) > -1) {
			return true;
		}
		return false;
	}
	
	getItem(s: string): Item {
		let i = Entity.indexEntity(s, this.items);
		if (i > -1) {
			return this.items[i];
		}
		console.log(`"Unable to find item named "${s}" in this collection... Did you try the right collection?`);
		return undefined;
	}
	
	getItemNames(): string[] {
		let names: string[] = [];
		this.items.forEach((i) => {
			names.push(i.getName());
		});
		return names;
	}
	
	removeItem(s: string): void {
		let i = Entity.indexEntity(s, this.items);
		if (i > -1) {
			this.items.splice(i, 1);
		}
	}
}