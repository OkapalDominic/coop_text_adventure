import Entity from './entity'
import Item from './item'

// manages details about Player in dungeon
export class Player extends Entity {
	// variables unique to Player
	/* Things to store in entity.state possibly add refence to it
		player's inventory
		area player is currently in
	*/
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string, p: Entity) {
		super(n, d, p);
	}
}

export default Player;