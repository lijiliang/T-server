/*
    @description 控制器
 */
const _    = require('lodash');
const fs   = require('fs');
const path = require('path');

const _controllerPath = '../controllers/';

//控制器规则 
var controllerRule = {
    '/': 'index',
    '/:id': 'index'
};


