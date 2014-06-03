//     myTemplate.js 0.3.0

//     (c) 2014 Guoyao Wu, 
//     myTemplate may be freely distributed under the BSD license.
//     For all details and documentation:
//     https://github.com/guoyao/myTemplate

(function(root, factory) {
    // Set up myTemplate appropriately for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(root);
    // Finally, as a browser global.
    } else {
        root.myTemplate = factory(root);
    }
}(this, function(root) {
    
    // Save the previous value of the `myTemplate` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousMyTemplate = root.myTemplate;
    
    var OPEN_TAG = '<%',
        CLOSE_TAG = '%>',
        config = {
            openTag: OPEN_TAG,
            closeTag: CLOSE_TAG
        };
    
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
            funcBody,
            func;

        if (config.openTag != OPEN_TAG) {
            // 将自定义分隔符转换成默认分隔符
            tmpl = tmpl.replace(new RegExp(config.openTag, 'g'), OPEN_TAG);
        }
        
        if (config.closeTag != CLOSE_TAG) {
            // 将自定义分隔符转换成默认分隔符
            tmpl = tmpl.replace(new RegExp(config.closeTag, 'g'), CLOSE_TAG);
        }
        
        funcBody = 'var result = "' + tmpl + '";';
        
        funcBody = funcBody.replace(/<%=\s*([^>]*)\s*%>/g, function(match, $1) {
            return '" + ' + $1.replace(/\\"/g, '"') + ' + "'; //替换的同时，恢复<%=%>中被转义的"号
        });
        
        funcBody = funcBody.replace(/<%\s*([^>]*)\s*%>/g, function(match, $1) {
            return '";' + $1.replace(/\\"/g, '"') + 'result += "'; //替换的同时，恢复<%%>中被转义的"号
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

    myTemplate.version = '0.3.0';
    
    myTemplate.config = function(name, value) {
        config[name] = value;
    };
    
    // Runs myTemplate.js in *noConflict* mode, returning the `myTemplate` variable
    // to its previous owner. Returns a reference to this myTemplate object.
    myTemplate.noConflict = function() {
        root.myTemplate = previousMyTemplate;
        return this;
    };
    
    return myTemplate;
}));
