/*
 * @fileOverview 工具类模块
 * @author LJL
 * @description 工具类模块
 */
const http = require('http');
const https = require('https');
const Url = require('url');
const queryStr = require('querystring');
const BufferHelper = require('bufferhelper');

const request = require('request');
// request = request.defaults({ jar: true });

/**
 * @description 根据url获取网页内容
 * @param  {[string]} url      [url]
 * @param  {[object]} headers  [请求头信息]
 * @param  {Function} callback [成功回调函数]
 * @param  {[object]} errback  [错误回调信息]
 * @returns {[object]}         [description]
 */
exports.getUrl = (url,headers,callback,errback) => {
    const option = {
        method: 'GET',
        url: url,
        headers: {
            'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
        },
        encoding: null
    };
    request(option, function(error, response, body){
        if(error){
            errback(error);
        }else{
            callback(body);
        }
    });
};

/**
 * @description  获取网页内容
 * @param  {[string]} url     [要获取网页的url]
 * @param  {[object]} headers [请求头信息]
 * @returns {[string]} body Content
 */
exports.getHttpContent = (url, headers) => {
    return new Promise(function(resolve, reject){
        exports.getUrl(url, headers, function(content){
            resolve(content);
        }, function(err){
            console.log('getHttpErr=' + err, url);
            reject(err);
        });
    });
};
