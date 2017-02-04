/**
 * @fileoverview html 转换
 * @author LJL
 * @description html 转换
 */

/**
 * @description 转换
 * @param {string} str 未转换的html字符串
 * @returns {string}
*/
function unescapeHTML(str){
    const _str = str;
    return _str.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, '\'');
}
module.exports = unescapeHTML;
