let {AsyncParallelHook} = require('tapable'); //异步的钩子 并行 等待所有并发的异步事件后 再执行回调

// 注册方法 有三种分为tap注册  tapAsync(cb)  tapPromise
//调用的时候也分三种  call callAsync  promise
class Lesson {
    constructor(){
        this.index = 0;
        this.hook={
            arch:new AsyncParallelHook(['name'])    
        }
    }
    tap(){//注册监听函数
        this.hook.arch.tapPromise('node',(name)=>{
            return new Promise((res,rej)=>{
                setTimeout(()=>{
                    console.log('node',name);
                    res();

                },1000);
            });
        });
        this.hook.arch.tapPromise('vue',function(name){
            return new Promise((res,rej)=>{
                setTimeout(()=>{
                    console.log('vue',name);
                    res();
                },1000);
            });
        });
    }
    start(){
        this.hook.arch.promise('Bruce-yangs').then(()=>{
            console.log('结束');
        })
    }
}

let l = new Lesson();
l.tap();//注册这两个事件
l.start();