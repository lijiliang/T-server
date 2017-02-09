/*
    *@description 核心文件
*/
//const path = require('path');
//const fs   = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('css/[name].css');
const webpack = require('webpack');

const cfg = {
    output: {
        publicPath: '../',
        filename: 'js/[name].js'      //根据入口文件输出的对应多个文件名
    },
    module: {
        //各种加载器，即让各种文件格式可用require引用
        loaders: [
            {
                test: /\.css/,
                loader: extractLESS.extract(
                    'css?sourceMap'
                )
            },
            {
                test: /\.less$/,
                loader: extractLESS.extract(
                    'css?sourceMap!' +
                    'autoprefixer?browsers=last 5 versions!'+
                    'less?sourceMap'
                )
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: function(path) {
                    // 路径中含有 node_modules 的就不去解析。
                    const isNpmModule = !!path.match(/node_modules/);
                    return isNpmModule;
                },
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
    },
    plugins: [extractLESS],
    resolve: {
        extensions:['','.js','.jsx']
    }
};

module.exports  = function (env){
    if(env === 'www'){
        //Webpack 提供了设置环境变量来优化代码的方案
        cfg.plugins.push(
            new webpack.DefinePlugin({
                'process.env':{
                    NODE_ENV: JSON.stringify('production')
                }
            })
        );

        //设置这个可以忽略压缩时产生的警告
        cfg.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        );
    }

    return cfg;
};
