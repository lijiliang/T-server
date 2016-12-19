/*
    controller
 */
// const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const setting = require('./setting');

const _controllerPath = '../'+ setting.path.controller +'/';

const controllerMain = {
    init: (router) => {
        const _self = controllerMain;
        //首页
        router.get('/', function* (){
            yield _self.runController.bind(this)('index');
        });
        //用户中心
        router.get('/user/:id', function* (){
            yield _self.runController.bind(this)('user');
        });

        router.get('/user/index', function* (){
            yield _self.runController.bind(this)('user/index');
        });
        //用户中心
        router.get('/users', function* (){
            yield _self.runController.bind(this)('users');
        });

        //404
        router.get('/404', function* (){
            yield _self.runController.bind(this)('bad');
        });
        router.get('*',function* (){
            yield _self.runController.bind(this)('bad');
        });
    },
    runController: function* (name){
        const _self = controllerMain;
        try{
            const controller = _self.getContrller(name);
            yield controller.bind(this)();
        }catch(e){
            console.log(e);
            //this.render({},'404');
        }
    },
    /*
     * @description 获取控制器
     */
    getContrller: (name) => {
        const _path = _controllerPath+name+'.js';

        //转换文件绝对路径
        const filePath = path.resolve(__dirname,_path);

        //判断文件是否存在
        if(fs.existsSync(filePath)){
            return require(_path);
        }else{
            throw Error('controller is not exists');
        }
    }
};


module.exports = controllerMain.init;
