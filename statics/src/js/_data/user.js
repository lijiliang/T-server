/**
 * @fileOverview 用户管理接口
 * @author hzl
 * @description 用户管理接口
 */
 const jsLib = window.jsLib || (window.jsLib={});
 jsLib.data = jsLib.data || {};
 const exports = {
     /*获取用户列表*/
     getUserData: function(data, cb){
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'user',
             data: data
         },_cb);
     },
     /*获取一个待编辑的用户*/
     getEditUserData:function(data,cb){
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'user',
             data: data
         },_cb);
     },
     /*获取管理用户的数据列表*/
     getUserManager:function(data,cb){
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_user',
             data: data
         },_cb);
     },
     /*提交保存一个用户修改的数据*/
     saveUserModifyData:function(data,cb){
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_user',
             type: 'post',
             reqType: 'update',
             headers: {
                 accept: 'application/json, text/javascript, */*; q=0.01',
                 'content-type': 'application/json; charset=utf-8'
             },
             data: data
         },_cb);
     },
     /*新增一个用户*/
     saveNewUserData:function(data,cb){
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_user',
             type: 'post',
             reqType: 'add',
             headers: {
                 accept: 'application/json, text/javascript, */*; q=0.01',
                 'content-type': 'application/json; charset=utf-8'
             },
             data: data
         },_cb);
     },
     /*修改用户角色数据*/
     modifyUserRole:function(data,cb){
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_user',
             type: 'post',
             reqType: 'role_update',
             headers: {
                 accept: 'application/json, text/javascript, */*; q=0.01',
                 'content-type': 'application/json; charset=utf-8'
             },
             data: data
         },_cb);
     },

     /*角色管理 - 获取后台角色管理列表数据*/
     getActorList: function(data, cb) {
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_role',
             data: data
         },_cb);
     },

     /*角色管理 - 提交一个新增的角色*/
     submitNewActor: function(data, cb) {
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_role',
             type: 'post',
             reqType: 'add',
             headers: {
                 accept: 'application/json, text/javascript, */*; q=0.01',
                 'content-type': 'application/json; charset=utf-8'
             },
             data: data
         },_cb);
     },

     /*角色管理 - 修改角色基础信息*/
     modifyActorBaseInfo: function(data, cb) {
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_role',
             type: 'post',
             reqType: 'update',
             headers: {
                 accept: 'application/json, text/javascript, */*; q=0.01',
                 'content-type': 'application/json; charset=utf-8'
             },
             data: data
         },_cb);
     },

     /*角色管理 - 修改角色权限*/
     modifyActorPermission: function(data, cb) {
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_role',
             type: 'post',
             reqType: 'permission_update',
             headers: {
                 accept: 'application/json, text/javascript, */*; q=0.01',
                 'content-type': 'application/json; charset=utf-8'
             },
             data: data
         },_cb);
     },

     /*权限管理 - 获取后台权限管理列表数据*/
     getPermissionList: function(data, cb) {
         const _cb = cb || function(){};
         return window.ajaxData({
             act: 'manager',
             mod: 'manage_permission',
             data: data
         },_cb);
     }
 };
 jsLib.data.user = exports;
