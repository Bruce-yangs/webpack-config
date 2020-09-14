class AsyncSeriesWaterfallHook { // 钩子同步方法
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) { 
        let [first,...others] = this.tasks;
        return others.reduce((p,n)=>{
            return p.then(() =>n(...args))
        },first(...args))
    }
}
let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapPromise('vue', function (name) {
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            console.log('vue', name);
            resolve();
        }, 1000);
    })
    
});
hook.tapPromise('node', function (name) {
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1000);
    })
});
hook.tapPromise('react', function (name, cb) {
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 1000);
    })
});
hook.promise('Bruce').then(() => {
    console.log('结束');
})