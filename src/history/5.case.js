class AsyncParallelHook { // 钩子同步方法
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tapAsync(name,task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let index = 0;
       let finalCallBack = args.pop();//拿出最终的函数
       let done=()=>{ //promise.all
           index++;
           if(index === this.tasks.length) {
               finalCallBack();
           }
       }
       this.tasks.forEach((task) =>{
           task(...args,done);
       })

    }
}
let hook = new AsyncParallelHook(['name']);
hook.tapAsync('vue',function(name,cb){
    setTimeout(()=>{
        console.log('vue',name);
        cb();
    },1000);
});
hook.tapAsync('node',function(name,cb){
    setTimeout(()=>{
        console.log('node',name);
        cb();
    },1000);
    
});
hook.tapAsync('react',function(name,cb){
    setTimeout(()=>{
        console.log('react',name);
        cb();
    },1000);
});
hook.callAsync('Bruce',function(name,cb){
    console.log('结束');
});