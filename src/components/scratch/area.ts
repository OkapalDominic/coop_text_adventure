import Entity from './entity'

// manages an area a player can be in dungeon
export class Area extends Entity {
	// variables unique to Area
	/* Things to store in entity.state possibly add refence to it
		areas connected to this area
	*/
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string, p: Entity) {
		super(n, d, p);
		
		this.setOnEnter(function() {
			console.log(`You have entered "${this.name}".`);
			console.log(this.description);
		});
		this.setOnExit(function() {
			console.log(`You have Left "${this.name}".`);
		});
	}
}

export default Area;