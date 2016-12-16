/*
 * @description 模板渲染
 */

const fs   = require('fs');
const path = require('path');
const _    = require('lodash');
const ejs  = require('ejs');

const setting  = require('./setting');
const viewPath = '../' + setting.path.view;

module.exports = function(data, tpl, status){
    var file = path.join(__dirname, viewPath, tpl+'.html');
    var _html;
    _.extend(this._data, data);
    this.status = status || 200;

    _html = ejs.render(fs.readFileSync(file).toString(), this._data);

    this.body = _html;
}