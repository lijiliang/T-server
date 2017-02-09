/**
 * @fileOverview 基础数据接口
 * @author sz
 * @description 基础数据接口
 */
 const jsLib = window.jsLib || (window.jsLib={});
 jsLib.data = jsLib.data || {};
 const exports = {
     getBaseData: function(data, cb){
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'base_data',
             data: data
         },_cb);
     }
 };
 jsLib.data.base = exports;
