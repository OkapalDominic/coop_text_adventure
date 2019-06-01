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
testEntity();
console.log('End of tests.');

// ----------------------------------
// testing out basic entity class
// ----------------------------------
function testEntity(): void {
	console.log('--------Testing Entity--------');
	
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

/*
// ----------------------------------
// figureng out if basic features of Item are working
// outdated
// ----------------------------------
function testItem(): void {
	console.log('--------Testing Item--------');
	// create item
	let i = new Item();
	// test title setting
	console.log(i.getTitle());
	i.setTitle('WonderfulItem');
	console.log(i.getTitle());
	// test description setting
	console.log(i.getDescription());
	i.setDescription('It probably does things!');
	console.log(i.getDescription());
	console.log('--------Done Item--------');
}

// ----------------------------------
// figureng out if basic features of Area are working
// outdated
// ----------------------------------
function testArea(): void {
	console.log('--------Testing Area--------');
	// create area
	let a = new Area();
	// test title setting
	console.log(a.getTitle());
	a.setTitle('InterestingArea');
	console.log(a.getTitle());
	// test description setting
	console.log(a.getDescription());
	a.setDescription('A very interesting place');
	console.log(a.getDescription());
	// test enter leave
	a.enter();
	a.leave();
	// test item
	a.removeItem('WonderfulItem');
	a.addItem(i);
	console.log(a.getItem(0));
	a.removeItem('WonderfulItem');
	console.log(a.getItem(0));
	a.addItem(i);
	a.addItem(i);
	console.log(a.getItem(0));
	console.log(a.getItem(1));
	console.log('--------Done Area--------');
}

// ----------------------------------
// figureng out if basic features of Dungeon are working
// outdated
// ----------------------------------
function testDungeon(): void {
	console.log('--------Testing Dungeon--------');
	// create dungeon
	let d = new Dungeon();
	// test title setting
	console.log(d.getTitle());
	d.setTitle('WonderfulDungeon');
	console.log(d.getTitle());
	// test description setting
	console.log(d.getDescription());
	d.setDescription('A sense of wonder fills the air!');
	console.log(d.getDescription());
	// tets bad cmd parse
	d.parseCommand('Baloney Beef Veal Pork');
	// test area adding
	d.parseCommand('enter InterestingArea');
	d.addArea(a);
	d.parseCommand('enter InterestingArea');
	// test area double add
	d.addArea(a);
	console.log(d.getCurrentArea());
	// test area removal
	d.removeArea('InterestingArea');
	console.log(d.getElementAreas(0));
	// test get current area
	console.log(d.getCurrentArea());
	// test item adding/removing
	d.removeItem('WonderfulItem');
	d.addItem(i);
	console.log(d.getItem(0));
	d.removeItem('WonderfulItem');
	console.log(d.getItem(0));
	d.addItem(i);
	d.addItem(i);
	console.log(d.getItem(0));
	console.log(d.getItem(1));
	d.removeItem('WonderfulItem');
	console.log(d.getItem(0));
	console.log(d.getItem(1));
	console.log('--------Done Dungeon--------');
}
*/