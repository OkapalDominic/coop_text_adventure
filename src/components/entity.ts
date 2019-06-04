// ----------------------------------
// A handy base class to hold name and description
// ----------------------------------
export class Entity {
	// name/description of Entity
	protected name: string;
	protected description: string;
		
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string) {
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
	}
	
	// ----------------------------------
	// get the Entity's name description
	// ----------------------------------
	getName(): string {	return this.name; }
	
	getDescription(): string { return this.description; }
	
	// ----------------------------------
	// static functions useful for testing/getting entities
	// ----------------------------------
	static indexEntity(s: string, e: Entity[]): number {
		return e.findIndex((i) => {
			return i.getName() === s;
		});
	}
}