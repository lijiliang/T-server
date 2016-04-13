/*
    controller
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const setting = require('./setting')

const _controllerPath = '../'+ setting.path.controller +'/';


var controllerMain = {
    init: (router)=>{
        var _self = controllerMain;
        //首页
        router.get('/', function*(){
            yield _self.runController.bind(this)('index');
        });
    },
    runController: function* (name){
        var _self = controllerMain;
        try{
            var controller = _self.getContrller(name);
            yield controller.bind(this)();
        }catch(e){
            console.log(e);
            //this.render({},'404');
        }
    },
    /*
     * @description 获取控制器
     */
    getContrller: (name)=>{
        var _path = _controllerPath+name+'.js';

        //转换文件绝对路径
        var filePath = path.resolve(__dirname,_path);

        //判断文件是否存在
        if(fs.existsSync(filePath)){
            return require(_path);
        }else{
            throw Error('controller is not exists');
        }
    }
};


module.exports = controllerMain.init;