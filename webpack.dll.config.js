let path = require('path');
let webpack = require('webpack');

module.exports = {
    mode:'development',
    entry:{
        vendor:['react','react-dom']
    },
    output:{
        filename:'dll_[name].js',//产生的文件名
        path:path.resolve(__dirname,'dist'),
        library:'[name]_[hash]',
        // libraryTarget:'var' var commonjs this
    },

    plugins:[
        new webpack.DllPlugin({//动态链接库
            name:'[name]_[hash]', // 此处需要与library 对应 name
            path:path.resolve(__dirname,'dist','manifest.json')    
        })
    ]
}