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
/*
 * @description: 根据api获取数据
 * @param: method {string} 获取类型
 * @param: act {string} act
 * @param: mod {string} mod
 * @param: data {object}
 * @return <Generator Function> 服务方法
 */
 const log4js = require('log4js');
 const logger = log4js.getLogger('helper');
 exports.getApiData = function(method, act, mod, data, headers){
     const _data = data || {};
     const ctx = this;

     _data.ip = tool.getClientIp(ctx.request);
     return new Promise(function(resolve, reject) {
         tool.ajax({
             type: method,
             data: _data,
             headers: headers,
             mod: mod,
             act: act,
             success: function(_sdata) {
                 resolve(_sdata);
             },
             error: function(err) {
                 reject(err);
                 logger.info('getApiData','method='+method+'\n act='+act+'\n op='+mod+'\n data='+JSON.stringify(data)+'\n header='+headers+'\n err='+err,ctx);
             }
         });
     });
 };

 /*
  * 获取json文件
  */
 exports.getJSONSync = function(file){
     const string = fs.readFileSync(file, 'utf8');
     return JSON.parse(string, true);
 };

/*
 * 获取ip地址
 */
 exports.getIp = function(req){
     let ipstr;
     let xip;
     const xipStr = req.headers['X-Forwarded-Proto'];
     ipstr = '';
     if(xipStr){
         xip = xipStr.split(',');
         ipstr = xip[0];
     }else if(req.connection){
         ipstr = req.connection.remoteAddress || req.connection.socket.remoteAddress;
     }else if(req.socket){
         ipstr = req.socket.remoteAddress;
     }
     return ipstr;
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

//插入到页面中的全局变量
exports.getGloabconsts = function(isDebug) {
    const _isDebug = !!isDebug || false;
    let GLOBAL_constS = [
        `var jsLib=window['jsLib']={},`,
        `pcSiteUrl='${_domain.pc}',`,
        `mSiteUrl='${_domain.m}',`,
        `API_URL='${setting.apiUrl}',`,
        `API_ENV='${setting.apiEnv}',`
    ].join('');

    if (_isDebug || _env === 'local') {
        GLOBAL_constS += 'STATIC_PATH="//' + _domain['static'] + '/debug";jsLib.getStaticUri={img: function(imgName){return STATIC_PATH+"/img/"+imgName;},css: function(cssName) {return STATIC_PATH+"/css/"+cssName;},js: function(jsName) {return STATIC_PATH+"/js/"+jsName}}';
    } else {
        GLOBAL_constS += 'STATIC_PATH="//' + _domain['static'] + '/dist";jsLib.getStaticUri={img: function(imgName){return STATIC_PATH+"/img/"+imgName;},css: function(cssName) {return STATIC_PATH+"/css/"+cssName;},js: function(jsName) {return STATIC_PATH+"/js/"+jsName}}';
    }

    return '<script>' + GLOBAL_constS + '</script>';
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
        _cssLinks += '<link href="//'+ _cssPath +'/' + _value + '" rel="stylesheet" type="text/css" />';
    });
    // return _cssLinks;
    return _cssLinks + exports.getGloabconsts(_isDebug);
};

/*
 * 构造js 资源路径
 * @param {string} jsList js列表
 * @example
 * init_js('jquery.js,react.js,common.js')
 */
exports.init_js = function(jsList, isDebug){
    const _isDebug = !!isDebug || false;
    let _jsLinks = '';
    const _jsMap = exports.getMap('js');
    const _jsPath = exports.getStaticPath('js', _isDebug);
    const _arr = jsList.split(',');
    const _timestamp = String(new Date().getTime()).substr(0, 8);

    const _buildSrcLink = function(key){
        let _link = '';
        const _modName = key;
        _link = '<script src="//' + _jsPath + '/' + _modName +'"></script>';
        return _link;
    };

    const _buildDistLink = function(key){
        let _link = '';
        let _val = key;
        _val = _.has(_jsMap, _val) ? _jsMap[_val] : _val + '?=' + _timestamp;
        _link += '<script src="//' + _jsPath + '/' + _val +'"></script>';
        return _link;
    };

    _arr.forEach(function(key){
        let _key = key;
        _key = 'js/' + _key;
        if(_env !== 'local'){
            _jsLinks += _isDebug ? _buildSrcLink(_key) : _buildDistLink(_key);
        }else{
            _jsLinks += _isDebug ? _buildDistLink(_key) : _buildSrcLink(_key);
        }
    });

    return _jsLinks;
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
