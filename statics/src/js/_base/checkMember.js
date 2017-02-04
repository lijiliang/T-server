/**
 * @fileOverview 检测用户是否登录
 * @author yy
 * @description 检测用户是否登录
 * @return {Boolean} 是否已登录
 */
import './cookie';
import {flushCookie} from './ctrlCookie';
import goLogin from './goLogin';

const checkMember = function(){
    const _obj = {
        key: 'atKey',
        name: 'atName'
    };

    const key =  $.cookie(_obj.key);

    //如果cookie存在
    if(key){
        //刷新cookie
        flushCookie();
        return true;
    }else{
        goLogin(true);//带返回地址
        return false;
    }
};

module.exports = checkMember;
