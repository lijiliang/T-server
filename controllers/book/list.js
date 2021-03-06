/**
 * @fileOverview 小说列表页控制器
 * @author LJL
 */
 const iconv = require('iconv-lite');
 const Tool = require('../../libs/tool');
 module.exports = function *(next){
     const id = this.params.id;
     const sid = this.params.sid || 1;
     const _url = 'http://api.youmeixun.com/bookzw/list/' + id + '/' + sid;
     // 获取数据
     const response = yield Tool.getHttpContent(_url, {});
     const responseJson = JSON.parse(iconv.decode(response, 'UTF-8'));
     let list = [];
     if(responseJson.code === 0){
         list = responseJson.data;
     }
     this.render({
         seo_info: {
             keywords: '',
             description: '',
             title: '首页'
         },//seo 信息
         id: id,
         sid: sid,
         title: responseJson.data[0].type,
         list: list,
         data: responseJson,
     }, 'book/list');
     return next;
 };
