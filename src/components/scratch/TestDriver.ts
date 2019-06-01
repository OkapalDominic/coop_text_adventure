// ../../../node_modules/typescript/bin/tsc --outDir compile *.ts
// cd compile
// node TestDriver.js

import Entity from './entity'
import Dungeon from './dungeon'
import Area from './area'
import Item from './item'

// ----------------------------------
// tests to run
// ----------------------------------
console.log('Start of tests.');
//testEntity();
//testItem();
//testArea();
//testDungeon();
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
	let i = new Item();
	
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
	let a = new Area();
	
	// display area
	console.log(a);
	
	
	
	// display dungeon
	console.log(a);
	
	console.log('--------Done Area--------');
}

// ----------------------------------
// figureng out if basic features of Dungeon are working
// ----------------------------------
function testDungeon(): void {
	console.log('--------Testing Dungeon--------');
	
	// create dungeon
	let d = new Dungeon('TestingDungeon', 'A dungeon that is being tested');
	
	// display dungeon
	console.log(d);
	
	
	
	// display dungeon
	console.log(d);
	
	console.log('--------Done Dungeon--------');
}