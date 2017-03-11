/**
 * @fileOverview 小说目录页控制器
 * @author LJL
 */
 const iconv = require('iconv-lite');
 const Tool = require('../../libs/tool');
 module.exports = function *(next){
     const id = this.params.id;
     const sid = this.params.sid;
     const _url = 'http://api.youmeixun.com/bookzw/dir/' + id + '/' + sid;
     // 获取数据
     const response = yield Tool.getHttpContent(_url, {});
     const responseJson = JSON.parse(iconv.decode(response, 'UTF-8'));
     let info = {};
     let list = [];
     if(responseJson.code === 0){
         info = responseJson.data.info;
         list = responseJson.data.list;
     }
     this.render({
         seo_info: {
             keywords: '',
             description: '',
             title: '首页'
         },//seo 信息
         title: info.name,
         info: info,
         list: list,
         data: responseJson,
     }, 'book/dir');
     return next;
 };
