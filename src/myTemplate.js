/**
 * Author: guoyao
 * Time: 05-29-2014 14:28
 * Blog: http://www.guoyao.me
 */

/**
 * 模板引擎
 * @name    myTemplate
 * @param   {String}  模板字符串
 * @param   {Object}  数据
 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
 */
var myTemplate = function template() {
    'use strict';
    
    var args = Array.prototype.slice.call(arguments),
        tmpl = args.shift().replace(/\r|\n/g, "").replace(/"/g, '\\"'), //转义"号
        funcBody = 'var result = "";',
        func;

    funcBody += ' result += "' + tmpl + '";'; 
    funcBody = funcBody.replace(/<%=\s*([^>]*)\s*%>/g, function(match, $1) {
        return '" + ' + $1.replace(/\\"/g, '"') + ' + "'; //替换的同时，恢复<%=%>中被转义的"号
    });
    funcBody = funcBody.replace(/<%\s*([^>]*)\s*%>/g, function(match, $1) {
        return '";' + $1.replace(/\\"/g, '"') + 'result += "'; //替换的同时，恢复<%=%>中被转义的"号
    });

    funcBody += " return result;";

    func = new Function(funcBody);
    if (args.length > 0) {
        return func.apply(args.shift(), args); //返回渲染好的HTML字符串
    }
    
    return function() { //返回渲染方法
        args = Array.prototype.slice.call(arguments);
        return func.apply(args.shift(), args);
    }
};

myTemplate.version = '0.1.0';