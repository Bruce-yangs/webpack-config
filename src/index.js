 import img from './img/123.jpg';
 import calc from './test';
require('./index.css') ;
/*import dayjs from 'dayjs';
console.log(dayjs('2018-08-08'));
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
console.log(dayjs().endOf('month').add(1, 'day').set('year', 2018)
.format('YYYY-MM-DD HH:mm:ss')); */


import React from 'react';
import {render} from 'react-dom';

render(<h1>jsx</h1>,window.rootaa);

console.log(calc.sum(1,2));

// import "@babel/polyfill";
// var hdasd={
//     like:12
// }

// console.log('xxx')
// console.log(hdasd)
/* require('./b.less') ;

let image = new Image();
image.src = img;
document.body.appendChild(image);


let fn = ()=>{
    console.log('1111')
}
fn();

class A {
    a = 1;
}
let a = new A();
console.log(a.a);
'11'.includes('1'); */


//请求数据
/* let xhr = new XMLHttpRequest();
xhr.open('GET','/user',true);
// xhr.open('GET','/api/user',true);
xhr.onload = function(){
    console.log(xhr.response);
}
xhr.send(); */