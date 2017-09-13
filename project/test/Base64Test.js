var origin = "asd/dfq?1=3&d=f#333";
var buf = new Buffer(origin);
console.log(origin.length);
console.log(buf.length);

var result = buf.toString('base64',0,buf.length-1);
console.log(result);