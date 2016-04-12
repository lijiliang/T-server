/*
    @description 路由
 */
const router = require('koa-router')();

module.exports = (app)=>{
    app.use(router.routes());

    return function *(next){
        console.log(this.request.url,this.status)

        //如果状态不是200，则表示没有控制器匹配成功
        if(this.status != 200){
            this.status = 404;
            this.body = '404';
        }

        yield next; //往下执行
    }
}
