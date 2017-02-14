/*
    @description 中间件
 */
const tpl = require('./tpl');
const helper = require('./helper');
const log4js = require('log4js');
const cookie = require('cookie');
const logger = log4js.getLogger('router');

module.exports = () => {
    return function* (next) {
        // logger.info(this.request.url, this.header['user-agent']);  // 打印当前访问的链接及用户的浏览器信息
        /**
         * [打印当前访问的链接及用户的浏览器信息]
         */
        logger.info(this.url,JSON.stringify({
            get: this.request.query,
            post: this.request.body
        }),this.headers['user-agent']);

        const ip = helper.getIp(this.request);
        //拿到cookie
        this.cookie = cookie.parse(this.headers.cookie || '');

        this._data = {
            query:this.request.query,
            uuid: this.session.uuid,
            cookie:this.cookie,
            ip: ip,
            isDebug: function(){
                return this.query.is_debug ? !!this.query.is_debug : false;
            },
            init_css: function(cssList){
                const _isDebug = this.isDebug();
                return helper.init_css(cssList,_isDebug);
            },
            init_js: function(jsList){
                const _isDebug = this.isDebug();
                return helper.init_js(jsList,_isDebug);
            },
            init_img: function(imgName){
                const _isDebug = this.isDebug();
                return helper.init_img(imgName,_isDebug);
            },
        };
        //渲染模板方法
        this.render = tpl;
        yield next; //往下执行
    };
};
