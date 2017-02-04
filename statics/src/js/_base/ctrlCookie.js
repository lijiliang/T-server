/**
 * @fileoverview  操作cookie(添加、刷新)
 * @author yy
 */

const _time = 30 * 60 * 1000; //coockie保存半小时
const _obj=['atKey','atName'];

/**
 * @description 添加cookie
 * @param {string} name 名称
 * @param {string} value value
 * @returns {Voild}
*/
exports.addCookie = function(name,value){
    const cookietime = new Date();
    cookietime.setTime(cookietime.getTime() + _time);
    $.cookie(name, value, { expires: cookietime, path: '/' }); //token
};

/**
 * @description 刷新cookie
 * @returns {Voild}
*/
exports.flushCookie = function(){
    const cookietime = new Date();
    cookietime.setTime(cookietime.getTime() + _time);

    $.each(_obj,function(index,name){
        if($.cookie(name) !== undefined){ //判断cookie是否存在
            $.cookie(name, $.cookie(name), { expires: cookietime, path: '/' }); //token
        }
    });
};

/**
 * @description 清除cookie
 * @returns {Voild}
*/
exports.clearCookie = function(){
    $.each(_obj,function(index,item){
        console.log($.cookie(item, '', { expires: -1,path:'/' }));
    });
};
