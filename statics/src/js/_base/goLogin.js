/**
 * @fileoverview 跳转到登陆页面
 * @author yy
 * @description 跳转到登陆页面
 */
import {clearCookie} from './ctrlCookie';

function goLogin(flag){
    clearCookie();

    const _href = window.location.href;
    const _url = location.protocol + '//' + window.location.hostname + '/login';
    if(flag){
        window.location.href = _url + '?backUrl=' + encodeURIComponent(_href);
    }else{
        window.location.href = _url;
    }
}

module.exports = goLogin;
