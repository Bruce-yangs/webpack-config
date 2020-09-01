let {AsyncParallelHook} = require('tapable'); //异步的钩子 并行 等待所有并发的异步事件后 再执行回调

// 注册方法 分为tap注册 tapAsync
class Lesson {
    constructor(){
        this.index = 0;
        this.hook={
            arch:new AsyncParallelHook(['name'])    
        }
    }
    tap(){//注册监听函数
        this.hook.arch.tapAsync('node',(name,cb)=>{
            setTimeout(()=>{
                console.log('node',name);
                cb();
            },1000);
            return ++this.index === 3?undefined:'还是学';
        });
        this.hook.arch.tapAsync('vue',function(name,cb){
            setTimeout(()=>{
                console.log('vue',name);
                cb();
            },1000);
        });
    }
    start(){
        this.hook.arch.callAsync('Bruce-yangs',function(name){
                console.log('结束');
        });
    }
}

let l = new Lesson();
l.tap();//注册这两个事件
l.start();