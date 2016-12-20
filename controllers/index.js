/**
 * @fileOverview 首页控制器
 * @author LJL
 */
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const tool = require('../libs/tool.js');

const webUrl = 'https://cnodejs.org/';   // 要采集的网站
module.exports = function* (next){
    // if(this.params.id){
    //     this.body = this.params.id;
    // }else{
    //     this.body = 'index controller liang';
    // }
    const content = yield tool.getHttpContent(webUrl, {});
    const webBoby  = iconv.decode(content, 'UTF-8');
    const $ = cheerio.load(webBoby);
    const currentTab = $('.header .current-tab').text();
    const listCnt = $('#topic_list .cell');
    const list = [];
    listCnt.map((index, obj) => {
        const $obj = $(obj);
        const _herf = $obj.find('.topic_title').attr('href');
        const _title = $obj.find('.topic_title').attr('title');
        const _lastTime = $obj.find('.last_active_time').text();
        const _avatar = $obj.find('.user_avatar img').attr('src');
        const _userName = $obj.find('.user_avatar').attr('href').slice(6);
        const _putTop = $obj.find('.put_top').text();
        list.push({
            href: _herf,
            title: _title,
            lastTime: _lastTime,
            avatar: _avatar,
            userName: _userName,
            putTop: _putTop
        });
        return list;
    });
    this.render({
        seo_info: {
            keywords: '',
            description: '',
            title: '首页'
        },//seo 信息
        list: list,
        title: currentTab,
    }, 'index');
    return next;
};
