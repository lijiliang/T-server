/**
 * @fileOverview url 查询
*/

/**
 * @description 获取某个查询
 * @param {string} name 名称
 * @returns {string|Null}
*/
function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}

module.exports = getQueryString;
