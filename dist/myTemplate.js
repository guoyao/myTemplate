/**
 * @file 简单的模板引擎
 * @author wuguoyao(wuguoyao@baidu.com)
 * @version 1.1.0
 */

(function (root, factory) {
    // For AMD.
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory(root);
        });
        // Next for CommonJS.
    } else if (typeof exports === 'object' && typeof module === 'object') {
        exports = module.exports = factory(root);
        // Finally, as a browser global.
    }
    else {
        root.myTemplate = factory(root);
    }
}(this, function (root) {
    'use strict';

    // for `noConflict`
    var previousMyTemplate = root.myTemplate;

    var OPEN_TAG = '<%';
    var CLOSE_TAG = '%>';

    var config = {
        openTag: OPEN_TAG,
        closeTag: CLOSE_TAG,
        escape: true
    };

    var encodeHTML = function (source) {
        return config.escape ? String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\\/g, '&#92;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;') : source;
    };

    var _slice = Array.prototype.slice;

    /**
     * @description 模板引擎
     * @param {...string} args 模板字符串和数据源
     * @return {string | Function} 渲染好的HTML字符串或者渲染方法
     */
    var myTemplate = function () {
        var args = _slice.call(arguments);

        if (args.length === 0) {
            return '';
        }

        var tmpl = args.shift().replace(/\r|\n/g, '').replace(/"/g, '\\"'); // 转义"号

        if (config.openTag !== OPEN_TAG) {
            // 将自定义开始分隔符转换成默认开始分隔符
            tmpl = tmpl.replace(new RegExp(config.openTag, 'g'), OPEN_TAG);
        }

        if (config.closeTag !== CLOSE_TAG) {
            // 将自定义结束分隔符转换成默认结束分隔符
            tmpl = tmpl.replace(new RegExp(config.closeTag, 'g'), CLOSE_TAG);
        }

        var funcBody = 'var result = "' + tmpl + '";';

        funcBody = funcBody.replace(/<%=\s*(((?!%>).)*)\s*%>/g, function (match, $1) {
            // 替换的同时，恢复<%=%>中被转义的"号
            return '" + this.___encodeHTML___(' + $1.replace(/\\"/g, '"') + ') + "';
        });

        funcBody = funcBody.replace(/<%\s*(((?!%>).)*)\s*%>/g, function (match, $1) {
            // 替换的同时，恢复<%%>中被转义的"号
            return '";' + $1.replace(/\\"/g, '"') + 'result += "';
        });

        funcBody += ' return result;';

        /* jshint -W054 */
        var func = new Function(funcBody);
        /* jshint +W054 */

        /**
         * 渲染方法
         * @param {Array} args 数据源
         * @return {string} 渲染好的HTML字符串
         */
        var renderer = function (args) {
            var data = args.shift();
            data.___encodeHTML___ = encodeHTML;
            var html = func.apply(data, args);
            delete data.___encodeHTML___;
            return html;
        };

        // 返回渲染好的HTML字符串
        if (args.length > 0) {
            return renderer(args);
        }

        // 返回包装的渲染方法
        return function () {
            args = _slice.call(arguments);
            return renderer(args);
        };
    };

    myTemplate.version = '1.1.0';

    myTemplate.config = function (name, value) {
        config[name] = value;
        return this;
    };

    // Runs myTemplate.js in *noConflict* mode, returning the `myTemplate` variable
    // to its previous owner. Returns a reference to this myTemplate object.
    myTemplate.noConflict = function () {
        if (root.myTemplate) {
            root.myTemplate = previousMyTemplate;
        }
        return this;
    };

    return myTemplate;
}));
