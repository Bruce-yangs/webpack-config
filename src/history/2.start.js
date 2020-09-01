let {SyncBailHook} = require('tapable');

class Lesson {
    constructor(){
        this.hook={
            arch:new SyncBailHook(['name'])    
        }
    }
    tap(){//注册监听函数
        this.hook.arch.tap('node',function(name){
            console.log('node',name);
            return '超级想学习';
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