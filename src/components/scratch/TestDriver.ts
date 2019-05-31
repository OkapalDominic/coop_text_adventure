// ../../../node_modules/typescript/bin/tsc --outDir compile *.ts
// cd compile
// node TestDriver.js

import Dungeon from './dungeon'
import Area from './area'

console.log('--------Testing Area--------');
let a = new Area();
console.log(a.getTitle());
a.setTitle('InterestingArea');
console.log(a.getTitle());
console.log(a.getDescription());
a.setDescription('A very interesting place');
console.log(a.getDescription());
a.enter();
a.leave();
console.log('--------Done Area--------');

console.log('--------Testing Dungeon--------');
let d = new Dungeon();
console.log(d.getTitle());
d.setTitle('WonderfulDungeon');
console.log(d.getTitle());
console.log(d.getDescription());
d.setDescription('A sense of wonder fills the air!');
console.log(d.getDescription());
d.parseCommand('Baloney Beef Veal Pork');
d.parseCommand('enter InterestingArea');
d.addArea(a);
d.parseCommand('enter InterestingArea');
d.addArea(a);
console.log(d.getCurrentArea());
d.removeArea('InterestingArea');
console.log(d.getElementAreas(0));
console.log(d.getCurrentArea());
console.log('--------Done Dungeon--------');

console.log('End of tests.');