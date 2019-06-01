import Entity from './entity'
import Player from './player'
import Area from './area'

//items that can be picked up/used
class Item extends Entity{
	// variables unique to Item
	/* Things to store in entity.state possibly add refence to it
		---?
	*/
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string, p: Entity) {
		super(n, d, p);
		
		this.setOnPickUp(function() {
			console.log(`You have picked up "${this.name}"!`);
			console.log(this.description);
		});
		this.setOnUse(function() {
			console.log(`You have used "${this.name}".`);
			console.log(`It should be removed from "${this.parentEntity.getName()}".`);
		});
		this.setOnDrop(function() {
			console.log(`You have dropped "${this.name}"...`);
		});
	}
}

export default Item;