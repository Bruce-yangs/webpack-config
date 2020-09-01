class AsyncParallelHook { // 钩子同步方法
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tapPromise(name,task) {
        this.tasks.push(task);
    }
    promise(...args) {
      let tasks =  this.tasks.map((task) =>task(...args));
       return Promise.all(tasks);
    }
}
let hook = new AsyncParallelHook(['name']);
hook.tapPromise('vue',function(name){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log('vue',name);
            res();
        },1000);
    })
});
hook.tapPromise('node',function(name){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log('node',name);
            res();
        },1000);
    })
});
hook.tapPromise('react',function(name){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log('react',name);
            res();
        },1000);
    })
});
hook.promise('Bruce').then(()=>{
    console.log('结束');
})