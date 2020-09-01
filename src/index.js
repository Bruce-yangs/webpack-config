//  import img from './img/123.jpg';
 import calc from './test';//webpack 自带treeshking 直打包用到的   如果是 require引入 es6会是 calc.default.sum  默认default下
require('./index.css') ; 
/*import dayjs from 'dayjs';
console.log(dayjs('2018-08-08'));
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
console.log(dayjs().endOf('month').add(1, 'day').set('year', 2018)
.format('YYYY-MM-DD HH:mm:ss')); */

import aa from './a';
import bb from './b';
import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

render(<h1>jsx</h1>,window.rootaa);

console.log(calc.sum(1,2));
console.log('index.js>>>>>>>>');
console.log($);
// scope hosting 作用域提示 webpack3后才加入该功能
let a=1;
let b=2;
let c=3;
let d= a+b+c;
console.log(d,">>>>>>");

//懒加载
/* let button = document.createElement('button');
button.innerHTML = 'hello';
button.addEventListener('click',()=>{
    console.log('xxxx1');
    import('./test.js').then(data=>{
        console.log(data.default);
    })

})
document.body.appendChild(button);
 */

 //热更新

 if(module.hot) {
     module.hot.accept('./c.js',()=>{
         let str = require('./c.js');
        console.log(str);    
     })
 }
// let str = require('./c.js');
//         console.log(str);   



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