let express = require('express');
let webpack = require('webpack');


//中间件
let middle = require('webpack-dev-middleware');

let config = require('./webpack.config.js');

let compiler = webpack(config);

let app = express();

app.use(middle(compiler));
app.use(express.static('dist'));
app.get('/user',(req,res)=>{
    res.json({name:'哈哈'})
})

app.listen(3000);