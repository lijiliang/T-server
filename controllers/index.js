/*
 *  index
 */

module.exports = function* (){
    // if(this.params.id){
    //     this.body = this.params.id;
    // }else{
    //     this.body = 'index controller liang';
    // }
    this.render({
        seo_info: {
            keywords: '',
            description: '',
            title: '首页'
        },//seo 信息
        list: ['js','css','html']
    }, 'index');
};
