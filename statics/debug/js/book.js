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

	__webpack_require__(3);

	var _layer = __webpack_require__(5);

	var _layer2 = _interopRequireDefault(_layer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	$('.search-btn').on('click', function () {
	    var _value = $('.s-value').val();
	    if (_value.length === 0) {
	        _layer2["default"].tips('请输入您要搜索的内容');
	        return false;
	    }
	    location.href = '/book/search?q=' + _value;
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */
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

/***/ }
/******/ ]);