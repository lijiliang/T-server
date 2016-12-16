/*
    @description 中间件
 */
const log4js = require('log4js');
const logger = log4js.getLogger('router');

var tpl = require('./tpl');
module.exports = () => {
    return function* (next) {
        logger.info(this.request.url, this.header['user-agent']);
        this._data = {};
        //渲染模板方法
        this.render = tpl;
        yield next; //往下执行
    };
};
