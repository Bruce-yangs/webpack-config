const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 
const path = require('path');
var glob = require('glob')
var fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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

module.exports = {
  // mode: 'production',
  // mode: 'development',
  devServer: {
    port: 8088,
    compress: true,
    // progress: true,
    contentBase: "./dist",
    // contentBase: path.join(__dirname, "dist"),
    open: true
  },
  entry: ['./src/index.js'] /* {
     pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'*/

    // index: './src/index.js'
  /*}  getEntries() */

      /* Object.assign(getEntries(), {
        // 用到什么公共lib（例如jquery.js），就把它加进vendor去，目的是将公用库单独提取打包 
        'vendor': ['jquery']
    }) */,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[contenthash:8].js',
    // publicPath:'http://www.baidu.com/'//配置cdn 这是全部都加上 html css js 也可以单独配置 需要的cdn如只配置css
  },
  watch:true,
  watchOptions:{
    poll:1000,//监控的选项
    // aggreatement: 1000//防抖 如一直输入代码
    ignored:/node_modules/ //忽略node_modules监控
  },
  //'source-map'会单独生成一个sourcemap文件
  //'eval-source-map'不会生成单独的sourcemap文件
  //'cheap-module-source-map'产生后可以保留起来
  //'cheap-module-eval-source-map'不会生成文件，集成在打包后的文件中，不会产生列
  devtool:'source-map',//映射源码  出错会表示当前报错的行数
    optimization: { //优化项
      /* splitChunks: {
          cacheGroups: {
              commons: {
                  name: "commons",
                  chunks: "initial",
                  minChunks: 2
              }
          }
      } */
      minimizer: [
       /*  new UglifyJsPlugin({
          cache: true,
          parallel: true
        }), */
        new OptimizeCSSAssetsPlugin({}),//OptimizeCSSAssetsPlugin压缩css后会导致压缩js 失效，此时得配合UglifyJsPlugin 压缩js才同时生效
      ],
  },
  devServer:{
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
  module: {//模块
    rules: [//规则
      {
        test:/\.html$/,
        use:'html-withimg-loader'//用于解析html中的<img src="xxx"/>图片
      },
      /* {
        test:/\.(png|jpg|gif)/,
        use:'file-loader'
      }, */
      {
        test:/\.(png|jpg|gif)$/,
        use:{
          loader:'url-loader',
          options:{//生产base64
            limit:1,
            // limit:200*1024,
            outputPath:'img/',
            publicPath:'http://www.baidu.com/' //单独配置图片cdn
          }
        }
      },
      {
        test:/\.js$/,
        exclude: /node_modules/,
        include:path.resolve(__dirname,'src'),
        use:{
          loader:'babel-loader',
          /* options:{
            presets:[
              '@babel/preset-env'
            ],
            plugins:[
              '@babel/plugin-proposal-class-properties','@babel/plugin-transform-runtime'
            ]
          } */
        }
      },
      {//css-loader 解析@import语法   //style-loader 把css 插入到head标签中 loader顺序从右向左执行
        test: /\.css$/,use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader']
      },
      {//less-loader 解析@import语法  
        test: /\.less$/,use:[MiniCssExtractPlugin.loader,'css-loader',{loader:'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: true,
          plugins: loader => [
            require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] }) // 添加前缀
          ]
        }},'less-loader']
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
     new HtmlWebpackPlugin({
       version: 'v1',
      filename: 'index.html', template: './src/index.html',
    //  minify: {
    //     removeAttributeQuotes: true,
    //     collapseWhitespace: true
    //   }, 
    //   hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    })
    /* new webpack.ProvidePlugin({
      jQuery: "jquery", $: "jquery"
    }), */


  ],
  externals:{
    jquery:"jQuery"
  }
  
};