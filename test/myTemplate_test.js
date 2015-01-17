/**
 * @file myTemplate测试用例
 * @author wuguoyao(wuguoyao@baidu.com)
 */

/*eslint-disable*/
var expect = require('chai').expect;
/*eslint-enable*/

var myTemplate = require('../src/myTemplate');

var EMPTY_STRING = '';

/*eslint-disable*/
var template = [
    '<ul>',
    '<% if (this.age > 25) { %>',
        '<% for (var i = 0, length = this.children.length; i < length; i++) { %>',
        '<li><%= this.children[i].name %></li>',
        '<% } %>',
    '<% } %>',
    '</ul>'
].join('');
/*eslint-enable*/

/*eslint-disable*/
var customTemplate = [
    '<ul>',
    '{{ if (this.age > 25) { }}',
    '{{ for (var i = 0, length = this.children.length; i < length; i++) { }}',
    '<li>{{= this.children[i].name }}</li>',
    '{{ } }}',
    '{{ } }}',
    '</ul>'
].join('');
/*eslint-enable*/

var data = {
    age: 26,
    children: [
        {
            name: 'child 1'
        },
        {
            name: 'child 2'
        }
    ]
};

var dataWithHtmlEntity = {
    age: 26,
    children: [
        {
            name: 'child 1<script>alert(1);</script>'
        },
        {
            name: 'child 2<a href="http://www.baidu.com/">baidu</a>'
        }
    ]
};

var expectation = '<ul><li>child 1</li><li>child 2</li></ul>';

var htmlEscapedExpectation = '<ul><li>child 1&lt;script&gt;alert(1);&lt;/script&gt;</li>' +
    '<li>child 2&lt;a href=&quot;http://www.baidu.com/&quot;&gt;baidu&lt;/a&gt;</li></ul>';

describe('myTemplate', function () {
    describe('#myTemplate()', function () {
        it('should return an empty string if no arguments specified', function () {
            expect(myTemplate()).to.equal(EMPTY_STRING);
        });
    });

    describe('#myTemplate(source)', function () {
        var renderer = myTemplate(template);

        it('should return a renderer function', function () {
            expect(renderer).to.be.a('function');
        });

        it('should return an expect html fragment for renderer', function () {
            expect(renderer(data)).to.equal(expectation);
        });
    });

    describe('#myTemplate(source, data)', function () {
        it('should return an expect html fragment', function () {
            expect(myTemplate(template, data)).to.equal(expectation);
        });

        it('should escape html entity in data', function () {
            expect(myTemplate(template, dataWithHtmlEntity)).to.equal(htmlEscapedExpectation);
        });

        it('should be error for uncorrect delimiter', function () {
            expect(myTemplate(customTemplate, data)).to.not.equal(expectation);
        });

        it('should be correct for custom config', function () {
            myTemplate.config('openTag', '{{').config('closeTag', '}}');
            expect(myTemplate(customTemplate, data)).to.equal(expectation);
        });
    });
});
