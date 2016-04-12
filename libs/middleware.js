/*
    @description 中间件
 */
module.exports = ()=>{
    return function *(next){

        yield next; //往下执行
    }
}