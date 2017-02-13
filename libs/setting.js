/*
 * 设置模块
 */
const config = require('../config');
const setting = config;
const _env = setting.env;
let _apiEnv = null;
let apiUrl = null;
let staticUrl;

// 判断环境
if(_env !== 'www'){
    _apiEnv = config.apiEnv || _env;
    // 判断调用api地址
    if(_apiEnv !== 'www'){
        apiUrl = 'http://' + config.domain.api;
    }else{
        apiUrl = 'http://' + _apiEnv + '.' + config.domain.api;
    }
    staticUrl = _env + '.' + config.domain.static;
}else{
    _apiEnv = _env;
    apiUrl = 'http://'+config.domain.api;
    staticUrl = config.domain.static;
}

// 处理当前网址
const _domains = config.domain;
for(const key in _domains){
    _domains[key] = (_env === 'www' ? '' :_env + '.') + _domains[key];
}
config.domain = _domains;

setting.apiUrl = apiUrl;
setting.apiEnv = _apiEnv;
setting.staticUrl = staticUrl;

module.exports = setting;
