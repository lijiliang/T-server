/**
 * @fileOverview 时间戳转换成日期格式
 * @author LJL
 * [dateFormat 时间戳转换成日期格式]
 * @param  {[int]} timestamp    [要格式化的时间 默认为：Y-m-d h:i:s]
 * @param  {[string]} format    [格式  dateFormat('1467442223')  dateFormat('1467442223','Y-m-d h:i:s')  dateFormat('1467442223','Y年m月d日 h时i分s秒')]
 * @return {[string]}           [格式化的时间字符串]
 */
 function dateFormat(timestamp, format){
     timestamp = timestamp + '';
     var _format = format || 'Y-m-d h:i:s';
     if(timestamp.length < 10){
        return timestamp;
     }
     var jsdate= new Date(timestamp*1000);
     var pad = function(n, c){
         if((n = n + "").length < c){
             return new Array(++c - n.length).join("0") + n;
         } else {
             return n;
         }
     };

     var f = {
         // 年
         Y: function(){return jsdate.getFullYear()},
         y: function(){return (jsdate.getFullYear() + "").slice(2)},
         // 月
         m: function(){return pad(f.n(), 2)},
         n: function(){return jsdate.getMonth() + 1},
         // 日
         d: function(){return pad(f.j(), 2)},
         j: function(){return jsdate.getDate()},
         // 时、分，秒
         g: function(){return jsdate.getHours()},
         h: function(){return pad(f.g(), 2)},
         i: function(){return pad(jsdate.getMinutes(), 2)},
         s: function(){return pad(jsdate.getSeconds(), 2)},
     };

     return _format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
        var ret = '';
         if( t!=s ){
             ret = s;
         } else if( f[s] ){
             ret = f[s]();
         } else{
             ret = s;
         }
         return ret;
     });
 }
module.exports = dateFormat;
