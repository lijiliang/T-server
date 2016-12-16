/*
 *  user
 */

module.exports = function* (next){
    if(this.params.id){
        this.body = this.params.id;
    }else{
        this.body = 'user body';
    }

    yield next;
};
