/**
 * @fileOverview 小说搜索页api控制器
 * @author LJL
 */

 const iconv = require('iconv-lite');
 const Tool = require('../../libs/tool');
 module.exports = function *(next){
     const _query = this.query;
     const _url = 'http://zhannei.baidu.com/api/customsearch/searchwap?q=' + encodeURIComponent(_query.q) + '&p=' + _query.page + '&s=2041213923836881982';
     // 获取数据
     const response = yield Tool.getHttpContent(_url, {});
     const responseJson = JSON.parse(iconv.decode(response, 'UTF-8'));
     this.body = responseJson;
     return next;
 };
