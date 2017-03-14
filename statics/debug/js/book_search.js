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

	var _search = __webpack_require__(1);

	var _search2 = _interopRequireDefault(_search);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _exports = {
	    init: function init() {
	        var _self = this;
	        /*渲染模板*/
	        _self.renderComponent();
	        return true;
	    },


	    /*渲染模板*/
	    renderComponent: function renderComponent() {
	        //var _self = this;
	        ReactDOM.render(React.createElement(_search2["default"], null), document.getElementById('search'));
	    }
	}; /**
	    * 搜索页
	    */

	_exports.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _getQueryString = __webpack_require__(2);

	var _getQueryString2 = _interopRequireDefault(_getQueryString);

	var _infiniteScroll = __webpack_require__(3);

	var _infiniteScroll2 = _interopRequireDefault(_infiniteScroll);

	var _layer = __webpack_require__(4);

	var _layer2 = _interopRequireDefault(_layer);

	var _cookie = __webpack_require__(5);

	var _cookie2 = _interopRequireDefault(_cookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description - 搜索页
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _page = 0;
	var _q = null;
	var loadId = {};

	var Search = function (_React$Component) {
	    _inherits(Search, _React$Component);

	    function Search(props) {
	        _classCallCheck(this, Search);

	        var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

	        _this.state = {
	            list: [],
	            totalNum: 0
	        };
	        return _this;
	    }

	    _createClass(Search, [{
	        key: 'getDate',
	        value: function getDate(page) {
	            loadId = _layer2["default"].open({
	                type: 2
	            });
	            var _self = this;
	            // _q = encodeURIComponent(_q);
	            // http://local.s.youmeixun.com/book/sapi?page=12&q=%E5%A4%A9%E6%93%8E
	            $.ajax({
	                url: 'http://s.youmeixun.com/book/sapi',
	                type: 'get',
	                data: {
	                    q: $.cookie('q') || encodeURIComponent(_q),
	                    page: page
	                },
	                dataType: 'json',
	                success: function success(data) {
	                    if (page === 0) {
	                        _self.setState({
	                            list: data.results,
	                            totalNum: Math.ceil(data.totalNum / 10)
	                        });
	                    } else {
	                        _self.setState({
	                            list: _self.state.list.concat(data.results),
	                            totalNum: Math.ceil(data.totalNum / 10)
	                        });
	                    }
	                    /*总页数*/
	                    var pageTotal = Math.ceil(data.totalNum / 10);

	                    // 开启滚动加载
	                    _infiniteScroll2["default"].start();
	                    if (page >= parseInt(pageTotal, 10)) {
	                        _infiniteScroll2["default"].remove();
	                    }
	                    setTimeout(function () {
	                        _layer2["default"].close(loadId);
	                    }, 200);
	                }
	            });
	        }
	        /*
	         * @description 初始化
	         */

	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _self = this;
	            _q = (0, _getQueryString2["default"])('q');
	            loadId = _layer2["default"].open({
	                type: 2
	            });
	            _self.getDate(_page);

	            _infiniteScroll2["default"].remove();

	            // 滚动加载
	            _infiniteScroll2["default"].init({
	                bufferPx: 100, // 距离低端px就触发onNear事件
	                time: 200, // 设置延迟触发onNear
	                onNear: function onNear() {
	                    _page++;
	                    _self.getDate(_page);
	                },
	                end: null, // 是否加载完了
	                onEnd: null, // 加载完了怎么办
	                onScroll: null
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'm-search' },
	                this.state.list.map(function (item, index) {
	                    var match = [];
	                    match = item.url.match(/(\d+)/g);
	                    var _href = '/book/dir/' + match[1] + '/' + match[2];
	                    return React.createElement(
	                        'a',
	                        { href: _href, className: 'info-item clearfix', key: index },
	                        React.createElement(
	                            'div',
	                            { className: 'info-thumb' },
	                            React.createElement('img', { src: item.image })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'info-text' },
	                            React.createElement(
	                                'stong',
	                                null,
	                                item.name
	                            ),
	                            React.createElement(
	                                'ul',
	                                null,
	                                React.createElement(
	                                    'li',
	                                    null,
	                                    '\u4F5C\u8005\uFF1A',
	                                    item.author_name
	                                ),
	                                React.createElement(
	                                    'li',
	                                    null,
	                                    '\u5206\u7C7B\uFF1A',
	                                    item.genre
	                                ),
	                                React.createElement(
	                                    'li',
	                                    null,
	                                    '\u72B6\u6001\uFF1A',
	                                    item.updateStatus
	                                ),
	                                React.createElement(
	                                    'li',
	                                    null,
	                                    '\u6700\u65B0\uFF1A',
	                                    item.newestChapter_headline
	                                )
	                            )
	                        )
	                    );
	                })
	            );
	        }
	    }]);

	    return Search;
	}(React.Component);

	module.exports = Search;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @fileOverview url 查询
	*/

	/**
	 * @description 获取某个查询
	 * @param {string} name 名称
	 * @returns {string|Null}
	*/
	function getQueryString(name) {
	  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	  var r = window.location.search.substr(1).match(reg);
	  if (r !== null) return unescape(r[2]);
	  return null;
	}

	module.exports = getQueryString;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	/**
	 * @module lib/infiniteScroll
	 *
	 * @usage
	 * @example
	 * 初始化
	 * lib.infiniteScroll.init({
	 *      bufferPx: 40, // 距离低端px就触发onNear事件
	        time: 200, // 设置延迟触发onNear
	        onNear: null, // 滚到底 事件处理器
	        end: null, // 是否加载完了
	        onEnd: null, // 加载完了怎么办
	        onScroll: null // scroll 事件处理
	 * });
	 *
	 * 关闭
	 * lib.infiniteScroll.remove();
	 *
	 * 开启
	 * lib.infiniteScroll.start();
	 *
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var jsLib = window.jsLib || (window.jsLib = {});
	    jsLib.base = jsLib.base || {};
	    var time = Date.now();

	    var infiniteScroll = {
	        defaultOpts: {
	            bufferPx: 40,
	            time: 200,
	            onNear: null,
	            onScroll: null,
	            end: null, // 是否加载完了
	            onEnd: null },

	        init: function init(opts) {
	            opts = opts || {};
	            this.options = $.extend(true, {}, this.defaultOpts, opts);
	            this.started = false;

	            this._addEvent();

	            return this;
	        },

	        remove: function remove() {
	            $(window).off('scroll', this.scrollHandler);
	            this.started = false;
	        },

	        start: function start() {
	            var opts = this.options;
	            $(window).on('scroll', this.scrollHandler);
	            this.started = true;
	        },

	        triggerEnd: function triggerEnd() {
	            var opts = this.options;

	            this.remove();
	            opts.onEnd && opts.onEnd();
	        },

	        _addEvent: function _addEvent() {
	            var that = this,
	                opts = this.options;
	            that.scrollHandler = function () {
	                that._handler();
	            };
	        },

	        _handler: function _handler() {
	            var opts = this.options;

	            opts.onScroll && typeof opts.onScroll == 'function' && opts.onScroll.apply(null);

	            if (this._isNearBottom()) {
	                var diff = Date.now() - time;
	                if (diff < opts.time) {
	                    return;
	                } else {
	                    time = Date.now();
	                }
	                $.isFunction(opts.onNear) && opts.onNear.apply(null);

	                if ($.isFunction(opts.end) && opts.end()) {
	                    this.triggerEnd();
	                }
	            } else {
	                return;
	            }
	        },

	        _isNearBottom: function _isNearBottom() {
	            var opts = this.options;
	            var $win = $(window);
	            var pxFromWinBottomToBottom = 0 + document.body.scrollHeight - $win.scrollTop() - $win.height();

	            return pxFromWinBottomToBottom < opts.bufferPx;
	        }

	    };

	    module.exports = infiniteScroll;
	    jsLib.base.infiniteScroll = infiniteScroll;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!

	 @Name：layer mobile v1.5 弹层组件移动版
	 @Author：贤心
	 @Date：2014-09-24
	 @Copyright：Sentsin Xu(贤心)
	 @官网：http://sentsin.com/layui/layer
	 @License：MIT

	 */
	/* layer*/
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    "use strict";

	    var jsLib = window.jsLib || (window.jsLib = {});
	    jsLib.base = jsLib.base || {};

	    var win = window;
	    //var path = ''; //所在路径，如果非模块加载不用配置
	    // path = path ? path : document.scripts[document.scripts.length-1].src.match(/[\s\S]*\//)[0];

	    var doc = document,
	        query = 'querySelectorAll',
	        claname = 'getElementsByClassName',
	        S = function S(s) {
	        return doc[query](s);
	    };

	    //默认配置
	    var config = {
	        type: 0,
	        shade: true,
	        shadeClose: true,
	        fixed: true,
	        anim: true
	    };

	    win.ready = {
	        extend: function extend(obj) {
	            var newobj = JSON.parse(JSON.stringify(config));
	            for (var i in obj) {
	                newobj[i] = obj[i];
	            }
	            return newobj;
	        },
	        timer: {},
	        end: {}
	    };

	    var index = 0,
	        classs = ['layermbox'],
	        Layer = function Layer(options) {
	        var that = this;
	        that.config = ready.extend(options);
	        that.view();
	    };

	    Layer.prototype.view = function () {
	        var that = this,
	            config = that.config,
	            layerbox = doc.createElement('div');

	        that.id = layerbox.id = classs[0] + index;
	        layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0));
	        layerbox.setAttribute('index', index);

	        var title = function () {
	            var titype = _typeof(config.title) === 'object';
	            return config.title ? '<h3 style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</h3><button class="layermend"></button>' : '';
	        }();

	        var button = function () {
	            var btns = (config.btn || []).length,
	                btndom;
	            if (btns === 0 || !config.btn) {
	                return '';
	            }
	            btndom = '<span type="1">' + config.btn[0] + '</span>';
	            if (btns === 2) {
	                btndom = '<span type="0">' + config.btn[1] + '</span>' + btndom;
	            }
	            return '<div class="layermbtn">' + btndom + '</div>';
	        }();

	        if (!config.fixed) {
	            config.top = config.hasOwnProperty('top') ? config.top : 100;
	            config.style = config.style || '';
	            config.style += ' top:' + (doc.body.scrollTop + config.top) + 'px';
	        }

	        if (config.type === 2) {
	            config.content = '<i></i><i class="laymloadtwo"></i><i></i><div>' + (config.content || '') + '</div>';
	        }

	        layerbox.innerHTML = (config.shade ? '<div ' + (typeof config.shade === 'string' ? 'style="' + config.shade + '"' : '') + ' class="laymshade"></div>' : '') + '<div class="layermmain" ' + (!config.fixed ? 'style="position:static;"' : '') + '>' + '<div class="section">' + '<div class="layermchild ' + (config.className ? config.className : '') + ' ' + (!config.type && !config.shade ? 'layermborder ' : '') + (config.anim ? 'layermanim' : '') + '" ' + (config.style ? 'style="' + config.style + '"' : '') + '>' + title + '<div class="layermcont">' + config.content + '</div>' + button + '</div>' + '</div>' + '</div>';

	        if (!config.type || config.type === 2) {
	            var dialogs = doc[claname](classs[0] + config.type),
	                dialen = dialogs.length;
	            if (dialen >= 1) {
	                layer.close(dialogs[0].getAttribute('index'));
	            }
	        }

	        document.body.appendChild(layerbox);
	        var elem = that.elem = S('#' + that.id)[0];
	        setTimeout(function () {
	            try {
	                elem.className = elem.className + ' layermshow';
	            } catch (e) {
	                return;
	            }
	            config.success && config.success(elem);
	        }, 1);

	        that.index = index++;
	        that.action(config, elem);
	    };

	    Layer.prototype.action = function (config, elem) {
	        var that = this;

	        //自动关闭
	        if (config.time) {
	            ready.timer[that.index] = setTimeout(function () {
	                layer.close(that.index);
	            }, config.time * 1000);
	        }

	        //关闭按钮
	        if (config.title) {
	            elem[claname]('layermend')[0].onclick = function () {
	                config.cancel && config.cancel();
	                layer.close(that.index);
	            };
	        }

	        //确认取消
	        if (config.btn) {
	            var btns = elem[claname]('layermbtn')[0].children,
	                btnlen = btns.length;
	            for (var ii = 0; ii < btnlen; ii++) {
	                btns[ii].onclick = function () {
	                    var type = this.getAttribute('type');
	                    if (type == 0) {
	                        config.no && config.no();
	                        layer.close(that.index);
	                    } else {
	                        config.yes ? config.yes(that.index) : layer.close(that.index);
	                    }
	                };
	            }
	        }

	        //点遮罩关闭
	        //在安卓三星中，型号Grand2（未测试其他，不过不支持多点触控的手机 这个问题应该普遍存在）；初始化时设置config中type:1 并且style中width小于clientWidth
	        //该情况下 安卓三星touch点击 会导致同页面其他layer无法显示 原因就是遮罩层的影响。
	        //解决方式 或者验证Android处理ShadeClose:false (或者提示用户自己处理);
	        if (config.shade && config.shadeClose) {
	            var shade = elem[claname]('laymshade')[0];
	            shade.onclick = function () {
	                layer.close(that.index, config.end);
	            };
	            shade.ontouchmove = function () {
	                layer.close(that.index, config.end);
	            };
	        }

	        config.end && (ready.end[that.index] = config.end);
	    };

	    var layer = {
	        v: '1.5',
	        index: index,

	        //核心方法
	        open: function open(options) {
	            var o = new Layer(options || {});
	            return o.index;
	        },

	        //alert方法
	        alert: function alert(msg, callback) {
	            var _self = this;

	            _self.open({
	                btn: ['确定'],
	                content: msg,
	                shadeClose: false,
	                yes: function yes(index) {
	                    var cb = callback || function () {};

	                    cb(index);

	                    _self.close(index);
	                }
	            });
	        },

	        //tips 方法
	        tips: function tips(msg, time) {
	            var _self = this;

	            _self.open({
	                style: 'width: auto; border:none; background: rgba(0, 0, 0, .8); font-size: 0.32rem; text-align: center; border-radius: .1rem; color:#fff;',
	                content: msg,
	                shade: false,
	                time: time || 2
	            });
	        },
	        close: function close(index) {
	            var ibox = S('#' + classs[0] + index)[0];
	            if (!ibox) return;
	            ibox.innerHTML = '';
	            doc.body.removeChild(ibox);
	            clearTimeout(ready.timer[index]);
	            delete ready.timer[index];
	            typeof ready.end[index] === 'function' && ready.end[index]();
	            delete ready.end[index];
	        },

	        //关闭所有layer层
	        closeAll: function closeAll() {
	            var boxs = doc[claname](classs[0]);
	            for (var i = 0, len = boxs.length; i < len; i++) {
	                layer.close(boxs[0].getAttribute('index') | 0);
	            }
	        }
	    };

	    module.exports = layer;
	    jsLib.base.layer = layer;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
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

/***/ }
/******/ ]);