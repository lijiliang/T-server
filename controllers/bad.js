/*
 * 404 模板输出控制
*/
module.exports = function* (){
    this.render({
        title:'404-页面访问错误'
    },'404');
};
