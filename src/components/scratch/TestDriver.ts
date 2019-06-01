// ../../../node_modules/typescript/bin/tsc --outDir compile *.ts
// cd compile
// node TestDriver.js

import Dungeon from './dungeon'
import Area from './area'
import Item from './item'

// figureng out if basic features of Item are working
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

// figureng out if basic features of Area are working
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

// figureng out if basic features of Dungeon are working
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
console.log('--------Done Dungeon--------');

console.log('End of tests.');