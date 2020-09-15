class AsyncSeriesWaterfallHook { // 钩子同步方法
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let index = 0;
        let finalCallBack = args.pop();
        let next = (err, data) => {
            let task = this.tasks[index];
            if (!task) return finalCallBack();
            if (index === 0) { // 执行的是第一个
                task(...args, next);
            } else {
                task(data, next);
            }
            index++;
        }
        next();
    }
}
let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('vue', function (name, cb) {
    setTimeout(() => {
        console.log('vue', name);
        cb(null, '结果');
    }, 1000);
});
hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log('node', name);
        cb(null, '结果1');
    }, 1000);
});
hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log('react', name);
        cb(null, '结果2');
    })
});
hook.callAsync('Bruce', () => {
    console.log('结束');
})