// areas that players can go to

export class Area {
	// name/description Area
	private title: string;
	private description; string;
	
	// what other areas can be accessed from this area
	private connectedAreas: Area[];
	
	constructor() {
		this.title = 'Boring area...'
		this.description = 'Nothing to do'
	}
}