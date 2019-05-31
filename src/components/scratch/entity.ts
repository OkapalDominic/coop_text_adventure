// base class to inherit from
class Entity {
	protected name: string;
	protected description: string;
	
	//constructor();
	constructor(n:string, d:string) {
		this.name = n;
		this.description = d;
	}
	
	//Examine();
	Examine(target: string): void {
		console.log('unimplemented');
	}
	
	//Interact();
	Interact(target: string): void {
		console.log('unimplemented');
	}
	
	//Activate();
	Activate(target: string): void {
		console.log('unimplemented');		
	}
	
	//Chat();
	Chat(target: string): void {
		console.log('unimplemented');
	}
}

export default Entity;