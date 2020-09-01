// console.log('差点是帅哥');
// module.exports = '差点是帅哥';
import a from './a';
import b from './b';
import $ from 'jquery';

let sum = (a,b) => {
    return a+b+'sum';
}
let minus = (a,b) => {
    return a-b+'minus';
}
console.log($);
console.log('test.js>>>>>>>>');
export default {
    sum,minus
}