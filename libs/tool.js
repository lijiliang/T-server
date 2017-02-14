/*
 * @fileOverview tool 工具类模块
 * @author LJL
 */
const http = require('http');
const https = require('https');
const Url = require('url');
const queryStr = require('querystring');
const BufferHelper = require('bufferhelper');
const _ = require('lodash');
const setting = require('./setting');
// const request = require('request');
// request = request.defaults({ jar: true });

/**
 * @description 根据url获取网页内容
 * @param  {[string]} url      [url]
 * @param  {[object]} headers  [请求头信息]
 * @param  {Function} callback [成功回调函数]
 * @param  {[object]} errback  [错误回调信息]
 * @returns {[object]}         [description]
 */
// exports.getUrl = (url,headers,callback,errback) => {
//     const option = {
//         method: 'GET',
//         url: url,
//         headers: {
//             'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
//         },
//         encoding: null
//     };
//     request(option, function(error, response, body){
//         if(error){
//             errback(error);
//         }else{
//             callback(body);
//         }
//     });
// };
exports.getUrl = (url, headers, callback, errback) => {
    const bufferHelper = new BufferHelper(),
        option = Url.parse(url);
    option.method = 'GET';
    option.headers = {};
    console.log(url);
    const httpType = option.protocol.indexOf('https') > -1
        ? https
        : http;
    const req = httpType.request(option, (res) => {
        res.on('data', (chunk) => {
            bufferHelper.concat(chunk);
        });
        res.on('end', () => {
            const html = bufferHelper.toBuffer();
            callback && callback(html);
        });
    });
    req.on('error', (e) => {
        errback && errback(e.message);
    });
    req.end();
};
/*
 * @description 发送post请求
 */
exports.postUrl = (url, data, headers, callback, errback) => {
    const bufferHelper = new BufferHelper(),
        option = Url.parse(url);
    option.method = 'POST';
    option.headers = {};
    const httpType = option.protocol.indexOf('https') > -1
        ? https
        : http;
    const sendData = _.isObject(data)
        ? queryStr.stringify(data)
        : data;
    option.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': sendData.length
    };

    const req = httpType.request(option, (res) => {
        res.on('data', (chunk) => {
            bufferHelper.concat(chunk);
        });
        res.on('end', () => {
            const html = bufferHelper.toBuffer();
            callback && callback(html);
        });
    });
    req.on('error', (e) => {
        errback && errback(e.message);
    });
    req.write(sendData + '\n');
    req.end();
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

/*获取客户端ip地址*/
exports.getClientIp = function(req) {
    let ipstr = null;
    let xip = null;
    let xipStr = null;
    xipStr = req.headers['x-forwarded-for'];
    ipstr = '';
    if (xipStr) {
        xip = xipStr.split(',');
        ipstr = xip[0];
    } else if (req.connection) {
        ipstr = req.connection.remoteAddress || req.connection.socket.remoteAddress;
    } else if (req.socket) {
        ipstr = req.socket.remoteAddress;
    }
    return ipstr;
};

/*时间戳格式化*/
exports.dateFormat = function(date) {
    const now = new Date(parseInt(date,10) * 1000);
    return now.toLocaleDateString().replace(/年|月/g, '-').replace(/日/g, ' ');
};

exports.ajax = function(...args) {
    let  _apiUrl = null;
    let _data = null;
    let _url = null;
    let act = null;
    let oArgs = null;
    let mod = null;
    let type = null;
    if (!args[0]) {
        return false;
    }
    oArgs   = args[0];
    type    = oArgs.type || 'GET';
    act     = oArgs.act || 'index';
    mod     = oArgs.mod;
    _data   = oArgs.data || {};
    _url    = oArgs.url || setting.apiUrl;

    if (!mod) {
        _apiUrl = _url + '/' + act;
    } else {
        _apiUrl = _url + '/' + act + '/' + mod;
    }

    _data.client = 'pc';

    if (type === 'POST') {
        return exports.postUrl(_apiUrl, oArgs.data, oArgs.headers || {}, function(r) {
            return oArgs.success && oArgs.success(r);
        }, function(e) {
            return oArgs.error && oArgs.error(e);
        });
    } else {
        _apiUrl += '?' + queryStr.stringify(_data);
        return exports.getUrl(_apiUrl, oArgs.headers || {}, function(r) {
            return oArgs.success && oArgs.success(r);
        }, function(e) {
            return oArgs.error && oArgs.error(e);
        });
    }
};
