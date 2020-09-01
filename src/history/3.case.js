class SyncWaterfallHook { // 钩子同步
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(...args) {
        console.log(...args);
        let [first,...other] = this.tasks;
        let ret = first(...args);
        other.reduce((a,b)=>{
            return b(a);
        },ret)
    }
}
let hook = new SyncWaterfallHook(['name']);
hook.tap('vue',function(name){
    console.log('vue',name);
    return '停止向下'
});
hook.tap('node',function(name){
    console.log('node',name);
    return '哈哈'
    
});
hook.tap('react',function(name){
    console.log('node',name);
});
hook.call('Bruce','xxx');