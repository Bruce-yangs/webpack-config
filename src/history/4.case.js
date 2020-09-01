class SyncLoopHook { // 钩子同步方法
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task=>{
            let ret;
            do{
                ret = task(...args);
            }while(ret!=undefined);
        })
    }
}
let hook = new SyncLoopHook(['name']);
let total = 0;
hook.tap('vue',function(name){
    console.log('vue',name);
    return ++total === 3?undefined:'停止向下';
});
hook.tap('node',function(name){
    console.log('node',name);
    
});
hook.tap('react',function(name){
    console.log('react',name);
});
hook.call('Bruce','xxx');