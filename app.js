/**
 * [app.js 程序启动入口]
 * @time 2016-11-28
 */
const app     = require('koa')();
const favicon = require('koa-favicon');
const session = require('koa-session');
const staticServer = require('koa-static');

const config     = require('./config');
const middleware = require('./libs/middleware');
const router     = require('./libs/router');
const path = require('path');
const log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' , layout: { type : 'basic' } }
    ],
    replaceConsole:true
});
const logger = log4js.getLogger('app');

app.keys = 'T-server'; //设置签名cookie密钥，在进行cookie签名时，只有设置signed为true的时候，才会使用密钥进行加密

app
    .use(staticServer(path.join(__dirname,'/public')))    // koa静态文件指定
    .use(favicon(path.join(__dirname,'/favicon.ico')))
    .use(session(app))
    .use(middleware())
    .use(router(app))
    .listen(config.port, () => {
        logger.info('Node listen at ' + config.port);
    });
