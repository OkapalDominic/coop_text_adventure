// ../../node_modules/typescript/bin/tsc --outDir compile *.ts
// cd compile
// node TestDriver.js

import {Entity} from './entity';
import {Player, PlayerList} from './player';
import {Dungeon, DungeonFactory} from './dungeon';
import {Area, AreaList} from './area';
import {Item, ItemList} from './item';

// ----------------------------------
// tests to run
// ----------------------------------
console.log('Start of tests.');
testDungeon();
console.log('End of tests.');



// ----------------------------------
// test creation of a simple dungeon
// ----------------------------------
function testDungeon(): void {
	console.log('--------Testing Dungeon--------');
	
	// create dungeon
	let d = DungeonFactory.testDungeon();
	console.log(d);
	
	// create dummy player
	let p = new Player('session', 'player username');
	p.enterDungeon(d);
	console.log(p);
	
	// test parseCommand
	d.parseCommand('Baloney Beef Pork Veal', p);
	d.parseCommand('enter Baloney Beef Pork Veal', p);
	d.parseCommand('enter StartRoom', p);
	d.parseCommand('enter EmptyRoom', p);
	d.parseCommand('enter ItemRoom', p);

	console.log('--------Done Dungeon--------');
}