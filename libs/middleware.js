/*
    @description 中间件
 */
const log4js = require('log4js');
const logger = log4js.getLogger('router');

const tpl = require('./tpl');
module.exports = () => {
    return function* (next) {
        logger.info(this.request.url, this.header['user-agent']);  // 打印当前访问的链接及用户的浏览器信息
        this._data = {};
        //渲染模板方法
        this.render = tpl;
        yield next; //往下执行
    };
};
