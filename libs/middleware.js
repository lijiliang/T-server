/*
    @description 中间件
 */
const tpl = require('./tpl');
const helper = require('./helper');
const log4js = require('log4js');
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

        this._data = {
            query:this.request.query,
            uuid: this.session.uuid,
            cookie:this.cookie,
            isDebug: function(){
                return this.query.is_debug ? !!this.query.is_debug : false;
            },
            init_css: function(cssList){
                const _isDebug = this.isDebug();
                return helper.init_css(cssList,_isDebug);
            },
        };
        //渲染模板方法
        this.render = tpl;
        yield next; //往下执行
    };
};
