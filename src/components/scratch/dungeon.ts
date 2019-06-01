import Entity from './entity'

// manages the current Dungeon
export class Dungeon extends Entity {
	// variables unique to Dungeon
	/* Things to store in entity.state possibly add refence to it
		areas in dungeon
		players in dungeon
	*/
	
	// ----------------------------------
	// constructor
	// ----------------------------------
	constructor(n: string, d: string) {
		super(n, d, undefined);
	}
	
	//------------------------------------------------------------
	// user command logic
	// how tell what user it was / user to update...(add player arg?)
	//------------------------------------------------------------
	parseCommand(command: string): void {
		// split on spaces and only 4 arguments [cmd object target JunkThatIsIgrnored]
		let cmd = command.split(' ', 3);
		switch (cmd[0]) {
			case 'enter':
				// test if an area exists to enter
				break;
			case 'pickup':
				// see if current area has item to pickup
				break
			case 'drop':
				// see if player has item to drop into area
				break
			case '':
				// put logic here
				break
			default:
				console.log(`error unknown command "${cmd[0]}"`);
		}
	}
}
export default Dungeon;