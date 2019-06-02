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
// tests go here
console.log('End of tests.');



// ----------------------------------
// test creation of a simple dungeon
// ----------------------------------
function testDungeon(): void {
	console.log('--------Testing Dungeon--------');
	let d = DungeonFactory.testDungeon();
	console.log(d);
	console.log('--------Done Dungeon--------');
}