const app     = require('koa')();
const favicon = require('koa-favicon');
const session = require('koa-session');

const config     = require('./config');
const middleware = require('./libs/middleware');
const router     = require('./libs/router');

app.keys = 'T-server'; //设置签名cookie密钥，在进行cookie签名时，只有设置signed为true的时候，才会使用密钥进行加密
app
    .use(session(app))
    .use(middleware())
    .use(router(app))
    .use(favicon(__dirname + '/favicon.ico'))
    .on('error', function(err){
        console.log(err);
    })
    .listen(config.port, () => {
        console.log("Node listen at " + config.port);
    });
