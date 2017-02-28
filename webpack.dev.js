/*
    *@description 开发模式配置
*/
const path = require('path');
//const fs   = require('fs');

const config = require('./config');
//const domainPrefix = config.env=='www'?'': config.env+'.';
//const staticUrl = `//${domainPrefix}${config.domain.static}/debug/`;
const staticUrl = '/debug/';
const srcPath = config.path.src;

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (_file) => {
    let _name = null;
    let extractLESS = null;
    let srcDir = null;
    const opt={};
    let file = _file;


    if(file){
        file = file.replace(/\\/g,'/');
        _name = file.replace(/\.js(x?)$/,'');
        _name = _name.replace(/\//g,'_');
        extractLESS = new ExtractTextPlugin('css/'+ _name +'.css');
        srcDir = `./${srcPath}/js/${config.appJsPath}/`;
        opt.entry = srcDir+file;
        opt.output = {
            filename: 'js/'+_name+'.js',
            chunkFilename: 'js/[name].js'
        };
    }else{
        extractLESS = new ExtractTextPlugin('css/[name].css');
        opt.output = {
            filename: 'js/[name].js',
            chunkFilename: 'js/[name].js'
        };
    }
    opt.output.publicPath = staticUrl;
    opt.watch = true;

    //默认 模块
    opt.module = {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [
            {
                test: /\.less$/,
                loader: extractLESS.extract(
                    'css?sourceMap!' +
                    'autoprefixer?browsers=last 5 versions!'+
                    'less?sourceMap'
                )
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url?limit=8192&name=img/[folder]/[name].[ext]!img?minimize&progressive=true&optimizationLevel=5'
            },
            {
                test: /\.(eot|svg|ttf|woff)$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['react','es2015']
                }
            }
        ],
        postLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['es3ify-loader']
            }
        ]
    };

    opt.plugins = [extractLESS];
    //当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，这在实际开发中很有必要。此时我们就可以通过配置externals参数来解决这个问题：
    opt.externals={
        react:'React',
        'react-dom':'ReactDOM',
        antd:'antd'
    };
    opt.resolve ={
        extensions:['','.js','jsx'], //配置默认后缀,比如 require('./a')  会解析成 require('./a.js'), 第一个参数一定是空字符串，表示用默认的后缀，只有没有后缀才会自动添加
        root:[
            /*
                配置查找模块路径
                比如 require('react')  这个时候没有设置相对路径，就会跑到设置的路径里面去查询
                这里主要是针对核心文件的处理
                当然如果是这样的文件不多  也可以通过设置alias来实现
            */
            path.resolve('./src/js/vendor')
        ]

        // alias: {
        //     'react':'./react.js'
        // }
    };

    return opt;
};
