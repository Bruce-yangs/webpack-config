const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 
const path = require('path');
// var glob = require('glob')
var fs = require('fs')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
// const manifest = require('./dist/manifest.json');
const PORT = 8081;

/**
 * 通过约定，降低编码复杂度
 * 每新增一个入口，即在src/pages目录下新增一个文件夹，以页面名称命名，内置一个index.js作为入口文件
 * 通过node的文件api扫描pages目录
 * 这样可以得到一个形如{page1: "入口文件地址", page2: "入口文件地址", ...}的对象
 */
const pagesDirPath = path.resolve(__dirname, "src");
const getEntries = () => {
  let result = fs.readdirSync(pagesDirPath);
  let entry = {};
  result.forEach(item => {
    entry[item] = path.resolve(__dirname, `src/${item}/index.js`);
  });
  return entry;
}
// console.log(getEntries());

/* let url ='';
if(DEV === 'dev') {
  url='http://localhost:3000';
} else {
  url='http://www.baidu.com';
}
console.log(url); */

module.exports = {
  mode: 'production',
  // mode: 'development',
  // devServer: {
  //   port: 8088,
  //   compress: true,
  //   // progress: true,
  //   contentBase: "./dist",
  //   // contentBase: path.join(__dirname, "dist"),
  //   open: true
  // },
  entry: {
    index: './src/index.js',
    test: './src/test.js'
  }

  /* ['./src/index.js'] */

  /* {
     pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'*/

  // index: './src/index.js'
  /*}  getEntries() */

  /* Object.assign(getEntries(), {
        // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包 
        'vendor': ['jquery']
    }) */
  ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    // filename: '[name]-[contenthash:8].js',
    // publicPath:'http://www.baidu.com/'//配置cdn 这是全部都加上 html css js 也可以单独配置 需要的cdn如只配置css
  },
  /* watch:true,
  watchOptions:{
    poll:1000,//监控的选项
    // aggreatement: 1000//防抖 如一直输入代码
    ignored:/node_modules/ //忽略node_modules监控
  }, */

  //'source-map'会单独生成一个sourcemap文件
  //'eval-source-map'不会生成单独的sourcemap文件
  //'cheap-module-source-map'产生后可以保留起来
  //'cheap-module-eval-source-map'不会生成文件，集成在打包后的文件中，不会产生列
  // devtool:'source-map',//映射源码  出错会表示当前报错的行数

  optimization: { //优化项
    splitChunks: { //分割代码块
      cacheGroups: { //增加缓存组
        vendor: {
          priority: 1, //权重 先抽离第三方  再抽离公共模块
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 2
        },
        common: { //公共模块
          chunks: "initial",
          name: "commons",
          minSize: 0,
          minChunks: 2 //用2次就抽离
        }
      }
    },
    minimizer: [
      /*  new UglifyJsPlugin({
         cache: true,
         parallel: true
       }), */
      new OptimizeCSSAssetsPlugin({}), //OptimizeCSSAssetsPlugin压缩css后会导致压缩js 失效，此时得配合UglifyJsPlugin 压缩js才同时生效
      new TerserPlugin() //因为OptimizeCSSAssetsPlugin引入会导致tree shaking 失效 ，TerserPlugin解决失效tree shaking问题
    ],
  },
  devServer: {
    hot: true,//启用热更新
    open: true,
    port: PORT,
    contentBase: './dist'
    //也可以服务端配置中间件
    /* proxy:{
      // '/api':'http://localhost:3000' //配置代理
      '/api':{ //配置代理
        target:'http://localhost:3000',
        pathRewrite:{
          '/api':''
        }
      } 
    }*/
  },
  //noParse:/jquery/,//不去解析 多个可以 /jquery|lodash/
  resolve: {
    //解析第三方包
    modules: [path.resolve('node_modules')],
    extensions: ['.js', '.css', '.json', '.vue'],
    alias: { //别名 简化书写目录
    },
    // mainFiles:['style','main']
    // mainFiles:[]//默认入口文件 index.js
  },
  module: { //模块
    rules: [ //规则
      {
        test: /\.html$/,
        use: 'html-withimg-loader' //用于解析html中的<img src="xxx"/>图片
      },
      /* {
        test:/\.(png|jpg|gif)/,
        use:'file-loader'
      }, */
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: { //生产base64
            limit: 1,
            // limit:200*1024,
            outputPath: 'img/',
            publicPath: 'http://www.baidu.com/' //单独配置图片cdn
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除 node_modules
        include: path.resolve(__dirname, 'src'), // 只针对某个目录去解析
        // use:'happypack/loader?id=js'
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ]
            /* ,
                        plugins:[
                          '@babel/plugin-proposal-class-properties','@babel/plugin-transform-runtime'
                        ] */
          }
        }
      },
      { //css-loader 解析@import语法   //style-loader 把css 插入到head标签中 loader顺序从右向左执行
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      { //less-loader 解析@import语法  
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: true,
            plugins: loader => [
              require('autoprefixer')({
                overrideBrowserslist: ['> 0.15% in CN']
              }) // 添加前缀
            ]
          }
        }, 'less-loader']
      },

      /*  {
         test: /\.js$/,use:[]
       } */
    ]
  },
  plugins: [
    // new webpack.ProgressPlugin(),

    new CleanWebpackPlugin(),

    /* new HtmlWebpackPlugin({ filename: 'pageOne.html',template: './src/pageOne/index.html',
    chunks: ['pageOne']}),
    new HtmlWebpackPlugin({filename: 'pageTwo.html',template: './src/pageTwo/index.html',
    chunks: ['pageTwo']}),
    new HtmlWebpackPlugin({filename: 'pageThree.html',template: './src/pageThree/index.html',
    chunks: ['pageThree','pageOne']}), */

    /****   使用HappyPack实例化    *****/
    /* new HappyPack({
      // 用唯一的标识符id来代表当前的HappyPack 处理一类特定的文件
      id: 'js',
      // 如何处理.js文件，用法和Loader配置是一样的
      use: [{
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        } ]
    }), */
    // 处理css文件
    /* new HappyPack({
      id: 'css-pack',
      loaders: ['css-loader']
    }) */

    /* new webpack.DllReferencePlugin({
      manifest
      // mainfest:path.resolve(__dirname,'dist','manifest.json')
    }), */
    new HtmlWebpackPlugin({
      version: 'v1',
      filename: 'index.html',
      template: './src/index.html',
      //  minify: {
      //     removeAttributeQuotes: true,
      //     collapseWhitespace: true
      //   }, 
      //   hash: true
    }),
    new webpack.NamedModulesPlugin(),//打印哪个模块热更新插件
    new webpack.HotModuleReplacementPlugin(),//热更新插件,
    new MiniCssExtractPlugin({
      filename: 'main.css',
    })


    //忽略某些依赖文件  忽略不需要的语言种类，单独在需要转换的文件中加入 语种 如 important 'moment/locale/zhe-cn';
    // new webpack.IgnorePlugin(/\.\/locale/,/moment/), 

    /* new webpack.DefinePlugin({
      DEV:JSON.stringify('dev')
    }) */

    /* new webpack.ProvidePlugin({
      jQuery: "jquery", $: "jquery"
    }), */


  ]/* ,
  externals: {//不打包 第三方依赖
    jquery: "jQuery"
  } */

};