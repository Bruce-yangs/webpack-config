let {SyncHook} = require('tapable');

class Lesson {
    constructor(){
        this.hook={
            arch:new SyncHook(['name'])    
        }
    }
    tap(){//注册监听函数
        this.hook.arch.tap('node',function(name){
            console.log('node',name);
        });
        this.hook.arch.tap('vue',function(name){
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