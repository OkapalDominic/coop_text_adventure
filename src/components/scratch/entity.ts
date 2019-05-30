// base class to inherit from
export class Entity {
	protected name: string;
	protected description: string;
	
	constructor();
	constructor(n:string, d:string) {
		name = n;
		description = d;
	}
	
	Examine(): void {
		
	}
	
	Interact(): void {
		
	}
	
	Activate(): void {
		
	}
	
	Chat(): void {
		
	}
}