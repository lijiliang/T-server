/*
 *  user
 */

module.exports = function* (){
    if(this.params.id){
        this.body = this.params.id;
    }else{
        this.body = 'user body';
    }
};
