import img from './img/123.jpg';
require('./index.css') ;
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

let xhr = new XMLHttpRequest();
xhr.open('GET','/user',true);
// xhr.open('GET','/api/user',true);
xhr.onload = function(){
    console.log(xhr.response);
}
xhr.send();