/*
 * @description 处理config.yml配置文件为json格式
 * @auth LJL
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const _file = path.join(__dirname,'./config.yml');
const config = yaml.safeLoad(fs.readFileSync(_file), 'utf-8');

module.exports = config;
