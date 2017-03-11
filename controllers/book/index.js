/**
 * @fileOverview 小说首页控制器
 * @author LJL
 */
const iconv = require('iconv-lite');
const Tool = require('../../libs/tool');
module.exports = function *(next){
    // 获取数据
    const response = yield Tool.getHttpContent('http://api.youmeixun.com/bookzw/catalog', {});
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
        title: '图书',
        list: list,
    }, 'book/index');
    return next;
};
