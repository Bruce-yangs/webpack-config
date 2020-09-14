class AsyncSeriesHook { // 钩子同步方法
    constructor(args) { // agrs=>['name]
        this.tasks = [];
    }
    tapAsync(name, task) {
        console.log('argsargsargsargs？？？？》》》》');

        console.log(name, task);

        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallBack = args.pop();

        let index = 0;
        let next = () => {
            if (this.tasks.length === index) return finalCallBack();
            let task = this.tasks[index++];
            task(...args,next);
        }
        next();
    }
}
let hook = new AsyncSeriesHook(['name']);
hook.tapAsync('vue', function (name, cb) {
    setTimeout(() => {
        console.log('vue', name);
        cb();
    }, 1000);
});
hook.tapAsync('node', function (name, cb) {
    setTimeout(() => {
        console.log('node', name);
        cb();
    }, 1000);
});
hook.tapAsync('react', function (name, cb) {
    setTimeout(() => {
        console.log('react', name);
        cb();
    }, 1000);
});
hook.callAsync('Bruce', () => {
    console.log('结束');
})