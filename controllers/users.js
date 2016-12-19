/*
 *  users
 */

module.exports = function* (){
    if(this.params.id){
        this.body = this.params.id;
    }else{
        this.body = 'users body';
    }
};
