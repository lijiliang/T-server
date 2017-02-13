/*
 * @description helper 业务协助
 */
 const _ = require('lodash');
 const tool = require('./tool');
 const setting = require('./setting');
 const path = require('path');
 const fs = require('fs');

 const _env = setting.env;
 const _domain = setting.domain;
 const _stPath = setting.staticUrl;

exports.getJSONSync = function(file){
    const string = fs.readFileSync(file, 'utf8');
    return JSON.parse(string, true);
};

/*
 * 获取js/css/img中的map
 * @type {srting}  css or js or img
 */
exports.getMap = function(type) {
    let _map = {};
    const _mapPath = path.join(__dirname, '..', 'views/map', 'map.json');
    try {
        _map = exports.getJSONSync(_mapPath);
    } catch (error) {
        const e = error;
        console.log(e);
    }
    return _map[type];
};

/*
 * getStaticPath 获取静态资源路径
 */
exports.getStaticPath = function(type, isDebug) {
    const _isDebug = !!isDebug || false;
    const _srcPath = '/debug';
    let _str = null;
    if(_env === 'local' || _isDebug){
        _str = _srcPath;
    }else{
        _str = '/dist';
    }

    return _stPath + _str;
};

/*
 * 构造css资源路径
 * @param {string} cssList css列表
 * @example
 * cssList = 'main.css,index.css'
 * init_css(cssList)
 */
exports.init_css = function(cssList, isDebug){
    const _isDebug = !!isDebug || false;
    let _cssLinks = '';
    const _cssMap = exports.getMap('css');
    const _cssPath = exports.getStaticPath('css', _isDebug);
    const _arr = cssList.split(',');
    const _timestamp = String(new Date().getTime()).substr(0, 8);
    _arr.forEach(function(_key){
        let _value;
        const  key = 'css/' + _key;
        if(_env !== 'local' && !_isDebug && _.has(_cssMap, key)){
            _value = _cssMap[key];
        }else{
            _value = key + '?t=' + _timestamp;
        }
        _cssLinks = '<link href="//'+ _cssPath +'/' + _value + '" rel="stylesheet" type="text/css" />';
    });
    return _cssLinks;
};

/*
 * 构造img 资源路径
 * @param {string} imgName 图片名
 * @example
 * init_img('logo.png')
 */
exports.init_img = function(imgName, isDebug){
    const _isDebug = !!isDebug || false;
    const _imgMap = exports.getMap('img');
    const _imgPath = exports.getStaticPath('img', _isDebug);
    const _timestamp = String(new Date().getTime()).substr(0, 8);
    const _imgName ='img/'+imgName;
    let _val = null;
    if(_env !== 'local' && !_isDebug && _.has(_imgPath, _imgName)){
        _val = _imgMap[_imgName];
    }else{
        _val = _imgName + '?t=' + _timestamp;
    }
    return '//' + _imgPath + '/' + _val;
};
