import {Entity} from './entity';
import {Dungeon} from './dungeon';
import {Item, ItemList} from './item';

type CallBack = () => void;

// ----------------------------------
// Areas in a dungeon
// ----------------------------------
export class Area extends Entity {
	// variables unique to area
	private owner: Dungeon;
	private items: ItemList;
	private connectedAreas: string[];
	
	protected bonEnter: CallBack;
	protected bonExit: CallBack;
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string, dungeon: Dungeon) {
		super(n, d);
		
		// set owner
		this.owner = dungeon;
		this.owner.addArea(this);
		
		this.items = new ItemList();
		
		this.connectedAreas = [];
		
		// set some default behaviors
		this.bonEnter = function() {
			console.log(`You have entered "${this.name}".`);
			console.log(this.description);
		};
		this.bonExit = function() {
			console.log(`You have Left "${this.name}".`);
		};
	}
	
	// ----------------------------------
	// Modify the Area's behaviors
	// ----------------------------------
	setOnEnter(f: CallBack): void {
		this.bonEnter = f;
	}
	setOnExit(f: CallBack): void {
		this.bonExit = f;
	}
	
	// ----------------------------------
	// Call the Area's set behaviors
	// ----------------------------------
	OnEnter(): void {
		this.bonEnter();
	}
	OnExit(): void {
		this.bonExit()
	}
	
	// ----------------------------------
	// modify items area has
	// ----------------------------------
	addItem(i: Item): boolean {
		return this.items.addItem(i);
	}
	hasItem(s: string): boolean {
		return this.items.hasItem(s);
	}
	getItemNames(): string[] {
		return this.items.getItemNames();
	}
	removeItem(s: string): void {
		this.items.removeItem(s);
	}
	
	// ----------------------------------
	// Modify connected Areas
	// ----------------------------------
	addConnectedArea(a: Area): boolean {
		let s = a.getName();
		if (this.hasConnectedArea(s) === false) {
			this.connectedAreas.push(s);
			return true;
		}
		console.log(`"${this.name}" is already connected to "${s}"`);
		return false;
	}
	hasConnectedArea(s: string): boolean {
		let a = this.connectedAreas.findIndex((i) => {
			return i === s;
		});
		if (a > -1) {
			return true;
		}
		return false;
	}
	getConnectedAreaNames(): string[] {
		return this.connectedAreas;
	}
	removeConnectedArea(s: string): void {
		let a = this.connectedAreas.findIndex((i) => {
			return i === s;
		});
		if (a > -1) {
			this.connectedAreas.slice(a, 1);
		}
	}
}

// ----------------------------------
// holds an array of areas
// ----------------------------------
export class AreaList {
	private areas: Area[];
	
	constructor() {
		this.areas = [];
	}
	
	// ----------------------------------
	// modify PlayerList
	// ----------------------------------
	addArea(a: Area): boolean {
		if (this.hasArea(a.getName()) === false) {
			this.areas.push(a);
			return true;
		}
		console.log(`This collection already has area with name "${a.getName()}"`);
		return false;
	}
	
	hasArea(s: string): boolean {
		if (Entity.indexEntity(s, this.areas) > -1) {
			return true;
		}
		return false;
	}
	
	getArea(s: string): Area {
		let a = Entity.indexEntity(s, this.areas);
		if (a > -1) {
			return this.areas[a];
		}
		console.log(`"Unable to find area named "${s}" in this collection... Did you try the right collection?`);
		return undefined;
	}
	
	getAreaNames(): string[] {
		let names: string[] = [];
		this.areas.forEach((a) => {
			names.push(a.getName());
		});
		return names;
	}
	
	removeArea(s: string): void {
		let a = Entity.indexEntity(s, this.areas);
		if (a > -1) {
			this.areas.splice(a, 1);
		}
	}
}