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


const ajaxData = function (options, cb) {
    //$.support.cors = true;
    const defaults = {
    //     crossDomain: true,
    //     headers: {
    //        'Access-Control-Allow-Origin': '*'
    //    },
        type: 'get',
        success: function (data) {
            /*用户尚未登录的错误号，待定*/
            if(data.code === '3011'){
                // goLogin();
            }

            if (typeof cb === 'function'){
                cb(data);
            }
        },
        cache:false,
        // error: function(xhr,msg,err){
        //     console.log(msg,err);
        // },
        // failsure: function(result){
        //     //
        //     console.log(result);
        // },
        dataType: 'json'
    };

    const _type = 'reqType' in options ? '?type=' + options.reqType : '';

    /*判断有无第二级路径*/
    if(options.op) {
        options.url = window.API_URL + '/' + options.act + '/' + options.op + _type;
    } else {
        options.url = window.API_URL + '/' + options.act + '/' + _type;
    }

    const option = $.extend({}, defaults, options);
    if(!option.data){
        option.data = {};
    }

    option.data.client = 'pc';

    return $.ajax(option);
};

module.exports = ajaxData;
