// type cbAnyArray_Any = (...args: any[]) => any;
type CallBack = () => void;

// base class to inherit and alter behaviors of
export class Entity {
	// name/description of Entity
	protected name: string;
	protected description: string;
	
	// Entity's parent Entity
	protected parentEntity: Entity
	
	// holds all objects that Entity should track
	protected state: {
		[key: string]: any;
	};
	
	// holds custom behavior handlers
	protected bonEnter: CallBack;
	protected bonExit: CallBack;
	protected bonPickUp: CallBack;
	protected bonUse: CallBack;
	protected bonDrop: CallBack;
		
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string, p: Entity) {
		// set Entity name
		if (n === undefined || n === null) {
			console.log('Providing default name, this may cause issues...');
			this.name = 'DefaultEntityName';
		} else if (/\s/.test(n)) {
			console.log(`Removing whitespace from "${n}", this may cause issues...`);
			this.name = n.replace(/\s/g, '');
		}else {
			this.name = n;
		}
		
		// set Entity description
		if (n === undefined || n === null) {
			console.log('Providing default Description, this may cause unexpected issues...');
			this.description = 'Default Entity Description';
		} else {
			this.description = d;
		}
		
		// set Entity's parent
		this.setParent(p);
		
		// ----------------------------------
		// the following should be set after creating entity
		// ----------------------------------
		this.state = {};
		
		this.bonEnter = undefined;
		this.bonExit = undefined;
		this.bonPickUp = undefined;
		this.bonUse = undefined;
		this.bonDrop = undefined;
	}
	
	// ----------------------------------
	// get the Entity's name description
	// ----------------------------------
	getName(): string {	return this.name; }
	
	getDescription(): string { return this.description; }
	
	// ----------------------------------
	// Modify the Entity's parent
	// ----------------------------------
	getParent(): Entity {
		return this.parentEntity;
	}
	
	setParent(p: Entity): void {
		if (p === undefined || p === null) {
			console.log('It may be dangerious to not have parent Entity, hope you know what you are doing... setting to undefined');
			this.parentEntity = undefined;
		} else {
			this.parentEntity = p;
		}
	}
		
	// ----------------------------------
	// Modify the Entity's state
	// ----------------------------------
	addState(key: string, value: any): boolean {
		if (this.state[key] !== undefined) {
			console.log(`object already has "${key}"`);
			return false;
		}
		this.state[key] = value;
		return true;
	}
	
	// warning reassigning values may break inherit classes...
	// so you know only modify (entity.getState('key').modify();)
	getState(key: string): any {
		return this.state[key];
	}
	
	removeState(key: string): void {
		this.state[key] = undefined;
	}
	
	// ----------------------------------
	// Modify the Entity's behaviors
	// ----------------------------------
	clearBehavior(): void {
		this.bonEnter = undefined;
		this.bonExit = undefined;
		this.bonPickUp = undefined;
		this.bonUse = undefined;
		this.bonDrop = undefined;
	}
	
	setOnEnter(f: CallBack): void {
		this.bonEnter = f;
	}
	
	setOnExit(f: CallBack): void {
		this.bonExit = f;
	}
	
	setOnPickUp(f: CallBack): void {
		this.bonPickUp = f;
	}
	
	setOnUse(f: CallBack): void {
		this.bonUse = f;
	}
	
	setOnDrop(f: CallBack): void {
		this.bonDrop = f;
	}
	
	// ----------------------------------
	// Call the Entity's set behaviors
	// ----------------------------------
	onEnter(): void {
		if (this.bonEnter === undefined) {
			console.log(`"${this.name}" does not have a set onEnter behavior`);
		} else {
			this.bonEnter();
		}
	}
	
	onExit(): void {
		if (this.bonExit === undefined) {
			console.log(`"${this.name}" does not have a set onExit behavior`);
		} else {
			this.bonExit();
		}
	}
	
	onPickUp(): void {
		if (this.bonPickUp === undefined) {
			console.log(`"${this.name}" does not have a set bonPickUp behavior`);
		} else {
			this.bonPickUp();
		}
	}
	
	onUse(): void {
		if (this.onUse === undefined) {
			console.log(`"${this.name}" does not have a set onUse behavior`);
		} else {
			this.onUse();
		}
	}
	
	onDrop(): void {
		if (this.bonDrop === undefined) {
			console.log(`"${this.name}" does not have a set onDrop behavior`);
		} else {
			this.bonDrop();
		}
	}
	
	// ----------------------------------
	// static functions useful for testing/getting entities
	// ----------------------------------
	static indexEntity(s: string, e: Entity[]): number {
		return e.findIndex((i) => {
			return i.getName() === s;
		});
	}
}

export default Entity;