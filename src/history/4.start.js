let {SyncLoopHook} = require('tapable'); //同步遇到某个不返回undefined的监听函数 会多次执行

class Lesson {
    constructor(){
        this.index = 0;
        this.hook={
            arch:new SyncLoopHook(['name'])    
        }
    }
    tap(){//注册监听函数
        this.hook.arch.tap('node',(name)=>{
            console.log('node',name);
            return ++this.index === 3?undefined:'还是学';
        });
        this.hook.arch.tap('vue',function(name){//SyncWaterfallHook 关系上下文 name 接收到的是 超级想学习
            console.log('vue',name);
        });
    }
    start(){
        this.hook.arch.call('Bruce-yangs');
    }
}

let l = new Lesson();
l.tap();//注册这两个事件
l.start();