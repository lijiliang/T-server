/**
 * @fileOverview 小说搜索页控制器
 * @author LJL
 */
 const iconv = require('iconv-lite');
 const Tool = require('../../libs/tool');
 module.exports = function *(next){
     this.render({
         seo_info: {
             keywords: '',
             description: '',
             title: '搜索'
         },//seo 信息
         title: this.query.q + '-搜索结果' || '搜索页',
     }, 'book/search');
     return next;
 };
