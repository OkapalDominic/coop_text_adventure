import Dungeon from './dungeon'
import Area from './area'

let a = new Area();
console.log(a.getTitle());
a.setTitle('Interesting Area');
console.log(a.getTitle());
console.log(a.getDescription());
a.setDescription('A very interesting place');
console.log(a.getDescription());
a.enter();
a.leave();

console.log('End of tests.');