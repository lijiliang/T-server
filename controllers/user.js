/*
 *  user
 */

module.exports = function* (){
    console.log(this.params)
    if(this.params.id){
        this.body = this.params.id;
    }else{
        this.body = 'user body';
    }
};
