class SyncBailHook { // 钩子同步
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(...args) {
        console.log(...args);
        let ret,index=0;
        do{
            ret = this.tasks[index++](...args);
        } while(ret === undefined && this.tasks.length>index);
    }
}
let hook = new SyncBailHook(['name']);
hook.tap('vue',function(name){
    console.log('vue',name);
    // return '停止向下'
});
hook.tap('node',function(name){
    console.log('node',name);
});
hook.call('Bruce','xxx');