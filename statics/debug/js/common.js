/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/debug/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

	var _ajaxData = __webpack_require__(1);

	var _ajaxData2 = _interopRequireDefault(_ajaxData);

	var _cookie = __webpack_require__(2);

	var _cookie2 = _interopRequireDefault(_cookie);

	var _goLogin = __webpack_require__(3);

	var _goLogin2 = _interopRequireDefault(_goLogin);

	var _checkMember = __webpack_require__(5);

	var _checkMember2 = _interopRequireDefault(_checkMember);

	var _dateFormat = __webpack_require__(6);

	var _dateFormat2 = _interopRequireDefault(_dateFormat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	// window.jsLib.base = {
	//     cookie: cookie,
	//     ajaxData: ajaxData,
	//     goLogin: goLogin,
	//     checkMember: checkMember,
	//     dateFormat: dateFormat
	// };
	/*
	 *@description 公用方法
	*/
	window.cookie = _cookie2["default"];
	window.ajaxData = _ajaxData2["default"];
	window.goLogin = _goLogin2["default"];
	window.checkMember = _checkMember2["default"];
	window.dateFormat = _dateFormat2["default"];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/*
	    @description ajax 请求
	    @explame
	    ```js
	        ajaxData({
	            act:'manager',
	            mod:'radio',
	            data: {
	                id: 3512
	            }
	        },function(result){
	            console.log(result);
	        })
	    ```js
	*/

	var ajaxData = function ajaxData(options, cb) {
	    //$.support.cors = true;
	    var defaults = {
	        //     crossDomain: true,
	        //     headers: {
	        //        'Access-Control-Allow-Origin': '*'
	        //    },
	        type: 'get',
	        success: function success(data) {
	            /*用户尚未登录的错误号，待定*/
	            if (data.code === '3011') {
	                // goLogin();
	            }

	            if (typeof cb === 'function') {
	                cb(data);
	            }
	        },
	        cache: false,
	        // error: function(xhr,msg,err){
	        //     console.log(msg,err);
	        // },
	        // failsure: function(result){
	        //     //
	        //     console.log(result);
	        // },
	        dataType: 'json'
	    };

	    var _type = 'reqType' in options ? '?type=' + options.reqType : '';

	    /*判断有无第二级路径*/
	    if (options.op) {
	        options.url = window.API_URL + '/' + options.act + '/' + options.op + _type;
	    } else {
	        options.url = window.API_URL + '/' + options.act + '/' + _type;
	    }

	    var option = $.extend({}, defaults, options);
	    if (!option.data) {
	        option.data = {};
	    }

	    option.data.client = 'pc';

	    return $.ajax(option);
	};

	module.exports = ajaxData;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/*!
	 * jQuery Cookie Plugin v1.4.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2006, 2014 Klaus Hartl
	 * Released under the MIT license
	 */

	var pluses = /\+/g;

	function encode(s) {
	    return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
	    return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
	    return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
	    if (s.indexOf('"') === 0) {
	        // This is a quoted cookie as according to RFC2068, unescape...
	        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
	    }

	    try {
	        // Replace server-side written pluses with spaces.
	        // If we can't decode the cookie, ignore it, it's unusable.
	        // If we can't parse the cookie, ignore it, it's unusable.
	        s = decodeURIComponent(s.replace(pluses, ' '));
	        return config.json ? JSON.parse(s) : s;
	    } catch (e) {}
	}

	function read(s, converter) {
	    var value = config.raw ? s : parseCookieValue(s);
	    return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

	    // Write

	    if (arguments.length > 1 && !$.isFunction(value)) {
	        options = $.extend({}, config.defaults, options);

	        if (typeof options.expires === 'number') {
	            var days = options.expires,
	                t = options.expires = new Date();
	            t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
	        }

	        return document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	        options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
	    }

	    // Read

	    var result = key ? undefined : {},

	    // To prevent the for loop in the first place assign an empty array
	    // in case there are no cookies at all. Also prevents odd result when
	    // calling $.cookie().
	    cookies = document.cookie ? document.cookie.split('; ') : [],
	        i = 0,
	        l = cookies.length;

	    for (; i < l; i++) {
	        var parts = cookies[i].split('='),
	            name = decode(parts.shift()),
	            cookie = parts.join('=');

	        if (key === name) {
	            // If second argument (value) is a function it's a converter...
	            result = read(cookie, value);
	            break;
	        }

	        // Prevent storing a cookie that we couldn't decode.
	        if (!key && (cookie = read(cookie)) !== undefined) {
	            result[name] = cookie;
	        }
	    }

	    return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
	    // Must not alter options, thus extending a fresh object...
	    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
	    return !$.cookie(key);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ctrlCookie = __webpack_require__(4);

	function goLogin(flag) {
	    (0, _ctrlCookie.clearCookie)();

	    var _href = window.location.href;
	    var _url = location.protocol + '//' + window.location.hostname + '/login';
	    if (flag) {
	        window.location.href = _url + '?backUrl=' + encodeURIComponent(_href);
	    } else {
	        window.location.href = _url;
	    }
	} /**
	   * @fileoverview 跳转到登陆页面
	   * @author yy
	   * @description 跳转到登陆页面
	   */


	module.exports = goLogin;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @fileoverview  操作cookie(添加、刷新)
	 * @author yy
	 */

	var _time = 30 * 60 * 1000; //coockie保存半小时
	var _obj = ['atKey', 'atName'];

	/**
	 * @description 添加cookie
	 * @param {string} name 名称
	 * @param {string} value value
	 * @returns {Voild}
	*/
	exports.addCookie = function (name, value) {
	    var cookietime = new Date();
	    cookietime.setTime(cookietime.getTime() + _time);
	    $.cookie(name, value, { expires: cookietime, path: '/' }); //token
	};

	/**
	 * @description 刷新cookie
	 * @returns {Voild}
	*/
	exports.flushCookie = function () {
	    var cookietime = new Date();
	    cookietime.setTime(cookietime.getTime() + _time);

	    $.each(_obj, function (index, name) {
	        if ($.cookie(name) !== undefined) {
	            //判断cookie是否存在
	            $.cookie(name, $.cookie(name), { expires: cookietime, path: '/' }); //token
	        }
	    });
	};

	/**
	 * @description 清除cookie
	 * @returns {Voild}
	*/
	exports.clearCookie = function () {
	    $.each(_obj, function (index, item) {
	        console.log($.cookie(item, '', { expires: -1, path: '/' }));
	    });
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	var _ctrlCookie = __webpack_require__(4);

	var _goLogin = __webpack_require__(3);

	var _goLogin2 = _interopRequireDefault(_goLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var checkMember = function checkMember() {
	    var _obj = {
	        key: 'atKey',
	        name: 'atName'
	    };

	    var key = $.cookie(_obj.key);

	    //如果cookie存在
	    if (key) {
	        //刷新cookie
	        (0, _ctrlCookie.flushCookie)();
	        return true;
	    } else {
	        (0, _goLogin2["default"])(true); //带返回地址
	        return false;
	    }
	}; /**
	    * @fileOverview 检测用户是否登录
	    * @author yy
	    * @description 检测用户是否登录
	    * @return {Boolean} 是否已登录
	    */


	module.exports = checkMember;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @fileOverview 时间戳转换成日期格式
	 * @author LJL
	 * [dateFormat 时间戳转换成日期格式]
	 * @param  {[int]} timestamp    [要格式化的时间 默认为：Y-m-d h:i:s]
	 * @param  {[string]} format    [格式  dateFormat('1467442223')  dateFormat('1467442223','Y-m-d h:i:s')  dateFormat('1467442223','Y年m月d日 h时i分s秒')]
	 * @return {[string]}           [格式化的时间字符串]
	 */
	function dateFormat(timestamp, format) {
	        timestamp = timestamp + '';
	        var _format = format || 'Y-m-d h:i:s';
	        if (timestamp.length < 10) {
	                return timestamp;
	        }
	        var jsdate = new Date(timestamp * 1000);
	        var pad = function pad(n, c) {
	                if ((n = n + "").length < c) {
	                        return new Array(++c - n.length).join("0") + n;
	                } else {
	                        return n;
	                }
	        };

	        var f = {
	                // 年
	                Y: function Y() {
	                        return jsdate.getFullYear();
	                },
	                y: function y() {
	                        return (jsdate.getFullYear() + "").slice(2);
	                },
	                // 月
	                m: function m() {
	                        return pad(f.n(), 2);
	                },
	                n: function n() {
	                        return jsdate.getMonth() + 1;
	                },
	                // 日
	                d: function d() {
	                        return pad(f.j(), 2);
	                },
	                j: function j() {
	                        return jsdate.getDate();
	                },
	                // 时、分，秒
	                g: function g() {
	                        return jsdate.getHours();
	                },
	                h: function h() {
	                        return pad(f.g(), 2);
	                },
	                i: function i() {
	                        return pad(jsdate.getMinutes(), 2);
	                },
	                s: function s() {
	                        return pad(jsdate.getSeconds(), 2);
	                }
	        };

	        return _format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
	                var ret = '';
	                if (t != s) {
	                        ret = s;
	                } else if (f[s]) {
	                        ret = f[s]();
	                } else {
	                        ret = s;
	                }
	                return ret;
	        });
	}
	module.exports = dateFormat;

/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);