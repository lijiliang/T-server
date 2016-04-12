const app     = require('koa')();
const favicon = require('koa-favicon');
const session = require('koa-session');

const config    = require('./config');

app
    .use(session(app))
    .use(favicon(__dirname + '/favicon.ico'))
    .listen(config.port, ()=>{
        console.log("Node listen at " + config.port);
    })


