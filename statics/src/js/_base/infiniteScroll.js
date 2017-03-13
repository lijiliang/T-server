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

define(function(){
    var jsLib = window.jsLib || (window.jsLib={});
    jsLib.base = jsLib.base || {};
    var time = Date.now();

    var infiniteScroll = {
        defaultOpts: {
            bufferPx: 40,
            time: 200,
            onNear: null,
            onScroll: null,
            end: null, // 是否加载完了
            onEnd: null, // 加载完了怎么办
        },

        init: function(opts) {
            opts = opts || {};
            this.options = $.extend(true, {}, this.defaultOpts, opts);
            this.started = false;

            this._addEvent();

            return this;
        },

        remove: function () {
            $(window).off('scroll', this.scrollHandler);
            this.started = false;
        },

        start: function () {
            var opts = this.options;
            $(window).on('scroll', this.scrollHandler);
            this.started = true;
        },

        triggerEnd: function () {
            var opts = this.options;

            this.remove();
            opts.onEnd && opts.onEnd();
        },

        _addEvent: function () {
            var that = this,
                opts = this.options;
            that.scrollHandler = function () {
                that._handler();
            }
        },

        _handler: function () {
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

        _isNearBottom: function () {
            var opts = this.options;
            var $win = $(window);
            var pxFromWinBottomToBottom = 0 + document.body.scrollHeight - $win.scrollTop() - $win.height();

            return (pxFromWinBottomToBottom < opts.bufferPx);
        }

    };

    module.exports = infiniteScroll;
    jsLib.base.infiniteScroll = infiniteScroll;
});
