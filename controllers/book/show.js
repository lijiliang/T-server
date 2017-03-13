/**
 * @fileOverview 小说详情页控制器
 * @author LJL
 */
 const iconv = require('iconv-lite');
 const Tool = require('../../libs/tool');
 module.exports = function *(next){
     const id = this.params.id;
     const sid = this.params.sid;
     const aid = this.params.aid;
     const _url = 'http://api.youmeixun.com/bookzw/show/' + id + '/' + sid + '/' + aid;
     // 获取数据
     const response = yield Tool.getHttpContent(_url, {});
     const responseJson = JSON.parse(iconv.decode(response, 'UTF-8'));
     let data = {};
     let list = [];
     let other = {};
     if(responseJson.code === 0){
         data = responseJson.data;
         list = data.content.split(/\s{4}/g);
         other = data.other;
     }
     this.render({
         seo_info: {
             keywords: '',
             description: '',
             title: '首页'
         },//seo 信息
         title: data.title || '详情页',
         list: list,
         other: other,
     }, 'book/show');
     return next;
 };
