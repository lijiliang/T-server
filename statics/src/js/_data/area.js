/**
 * @fileOverview 地区相关接口
 * @author sz
 * @description 地区相关接口
 */
 var jsLib = window.jsLib || (widnow.jsLib={});
 jsLib.data = jsLib.data || {};
 var exports = {

     /*获取地区下拉列表*/
     getArea: function(data, cb){
         var _cb = cb || function(){};
         return ajaxData({
             act: 'area'
         },_cb);
     }
 };
 jsLib.data.area = exports;
