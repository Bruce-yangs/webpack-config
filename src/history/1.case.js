class SyncHook { // 钩子同步
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tap(name,task) {
        this.tasks.push(task);
    }
    call(...args) {
        console.log(...args);
        this.tasks.forEach(task => task(...args));
    }
}
let hook = new SyncHook(['name']);
hook.tap('vue',function(name){
    console.log('vue',name);
});
hook.tap('node',function(name){
    console.log('node',name);
});
hook.call('Bruce','xxx');