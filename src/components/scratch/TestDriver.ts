// ../../../node_modules/typescript/bin/tsc --outDir compile *.ts
// cd compile
// node TestDriver.js

import Entity from './entity'
import Dungeon from './dungeon'
import Player from './player'
import Area from './area'
import Item from './item'

// ----------------------------------
// tests to run
// ----------------------------------
console.log('Start of tests.');
//testEntity();
//testItem();
//testArea();
//testPlayer();
testDungeon();
console.log('End of tests.');

// ----------------------------------
// testing out basic entity class
// ----------------------------------
function testEntity(): void {
	console.log('--------Testing Entity--------');
	
	// create entity
	let e = new Entity('test', 'testing entity', undefined);
	
	// display entity
	console.log(e);
	
	// test adding a state
	console.log('getState when no "meat": ', e.getState('meat'));
	console.log('addState "meat": ', e.addState('meat', ['Baloney', 'Beef', 'Veal', 'Pork']));
	console.log('getState is "meat": ', e.getState('meat'));
	console.log('addState "meat" aleady exists: ', e.addState('meat', ['Baloney', 'Beef', 'Veal', 'Pork']));
	
	// test removing a state
	console.log('removeState "meat": ', e.removeState('meat'));
	console.log('getState when no "meat": ', e.getState('meat'));
	console.log('removeState nonexistent "veggies": ', e.removeState('veggies'));
	
	// test behavior
	console.log('onEnter undefined: ', e.onEnter());
	console.log('setOnEnter: ', e.setOnEnter(function() {
		console.log('NOTICE ME');
		console.log('NOTICE ME');
		console.log(this.name);
		console.log('NOTICE ME');
		console.log('NOTICE ME');
	}));
	console.log('onEnter defined: ', e.onEnter());
	
	// display entity
	console.log(e);
	
	console.log('--------Done Entity--------');
}

// ----------------------------------
// figureng out if basic features of Item are working
// ----------------------------------
function testItem(): void {
	console.log('--------Testing Item--------');
	
	// create item
	let d = new Dungeon('TestingDungeon', 'A dungeon that is being tested');
	let a = new Area('TestArea', 'A tiny room to test things.', d);
	let i = new Item('TestItem', 'A quality testing item', a);
	
	// display item
	console.log(i);
	
	
	
	// display item
	console.log(i);
	
	console.log('--------Done Item--------');
}

// ----------------------------------
// figureng out if basic features of Area are working
// ----------------------------------
function testArea(): void {
	console.log('--------Testing Area--------');
	
	// create area
	let d = new Dungeon('TestingDungeon', 'A dungeon that is being tested');
	let a = new Area('TestArea', 'A tiny room to test things.', d);
	
	// display area
	console.log(a);
	
	
	
	// display Area
	console.log(a);
	
	console.log('--------Done Area--------');
}

// ----------------------------------
// figureng out if basic features of Player are working
// ----------------------------------
function testPlayer(): void {
	console.log('--------Testing Player--------');
	
	// create Player
	let d = new Dungeon('TestingDungeon', 'A dungeon that is being tested');
	let p = new Player('TestPlayer', 'A convenient test subject.', d);
	
	// display Player
	console.log(p);
	
	
	
	// display Player
	console.log(p);
	
	console.log('--------Done Player--------');
}

// ----------------------------------
// figureng out if basic features of Dungeon are working
// ----------------------------------
function testDungeon(): void {
	console.log('--------Testing Dungeon--------');
	
	// create dungeon
	let d = new Dungeon('TestingDungeon', 'A dungeon that is being tested');
	// test rooms for dungeon
	let a0 = new Area('StartArea', 'A room in which adventure begins.', d);
	let a1 = new Area('TestArea', 'A tiny room to test things.', d);
	// test players for dungeon
	let p0 = new Player('TestPlayer', 'A convenient test subject.', d);
	
	// display dungeon
	console.log(d);
	
	// add areas to dungeon
	console.log('hasArea no areas: ', d.hasArea('StartArea'));
	console.log('addArea start: ', d.addArea(a0));
	console.log('hasArea start: ', d.hasArea('StartArea'));
	console.log('getArea test: ', d.getArea('StartArea') === a0);
	console.log('addArea duplicate: ', d.addArea(a0));
	// test manually add area to state backing
	console.log(d.getState('areas'))
	console.log(d.getState('areas').push(a1));
	console.log(d.getState('areas'))
	
	// add Player to dungeon
	console.log('hasPlayer no player: ', d.hasPlayer('TestPlayer'));
	console.log('addPlayer start: ', d.addPlayer(p0));
	console.log('hasPlayer testplayer: ', d.hasPlayer('TestPlayer'));
	console.log('getPlayer testplayer: ', d.getPlayer('TestPlayer') === p0);
	console.log('addPlayer duplicate: ', d.addPlayer(p0));
	
	// command unreconized
	console.log('unknown command: ', d.parseCommand('Baloney Beef Pork Veal'));
	
	// command to enter room
	console.log('enter unknow area: ', d.parseCommand('enter Baloney'));
	console.log('enter room StartArea: ', d.parseCommand('enter StartArea'));
	console.log('enter room TestArea: ', d.parseCommand('enter TestArea'));
	
	// display dungeon
	console.log(d);
	
	console.log('--------Done Dungeon--------');
}