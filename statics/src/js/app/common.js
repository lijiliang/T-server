/*
 *@description 公用方法
*/
import ajaxData from '../_base/ajaxData';
import cookie from '../_base/cookie';
import goLogin from '../_base/goLogin';
import checkMember from '../_base/checkMember';
import dateFormat from '../_base/dateFormat';

// window.jsLib.base = {
//     cookie: cookie,
//     ajaxData: ajaxData,
//     goLogin: goLogin,
//     checkMember: checkMember,
//     dateFormat: dateFormat
// };
window.cookie = cookie;
window.ajaxData = ajaxData;
window.goLogin = goLogin;
window.checkMember = checkMember;
window.dateFormat = dateFormat;
