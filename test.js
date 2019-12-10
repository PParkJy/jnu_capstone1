let me = new Map();
var arr = [];
var obj1 = new Object();
var obj2 = new Object();
obj1.x = 1;
obj1.y = 2;
obj2 = (3, 4));
console.log(obj2)
arr.push(obj1);
arr.push(obj2);

me.set('name', obj1);
me.set('age', obj2);

me.forEach(element => {
  console.log(element);  
});