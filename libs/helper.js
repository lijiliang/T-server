/*
 * @description helper 业务协助
 */
 const _ = require('lodash');
 const tool = require('./tool');
 const setting = require('./setting');
 const path = require('path');
 const fs = require('fs');

 const _env = setting.env;
 const _domain = setting.domain;
 const _stPath = setting.staticUrl;
 console.log(_domain);
