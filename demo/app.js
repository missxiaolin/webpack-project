//es modues
import sum from './sum';

// commonjs
var minus = require('./manus');

// amd
require(['./muti'], function (muti) {
    console.log('muti(3,2)', muti(3, 2))
})

console.log('sum(23,24)', sum(23, 24));

console.log('minus(23,24)', minus(23, 24))