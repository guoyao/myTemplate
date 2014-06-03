
# myTemplate-0.3.0

简洁的 javascript 模板引擎

##	目录

*	[特性](#特性)
*	[快速上手](#快速上手)
*	[模板语法](#模板语法)
*	[下载](#下载)
*	[方法](#方法)
*	[更新日志](#更新日志)
*	[开发者](#开发者)
*	[授权协议](#授权协议)

##	特性

1.	源码简洁明了，学习成本极低
2.  不使用with，因此模板中可以输出全局变量
3.  支持自定义分隔符
4.  支持Node RequireJS
5.	支持所有流行的浏览器

## 快速上手


### 编写模板

使用一个``type="text/template"``的``script``标签存放模板：
	
	<script type="text/template" id="template">
        <p><strong>Name:</strong> <%= this.name %></p>
        <p><strong>Age:</strong> <%= this.age %></p>
        <% if (this.gender) { %>
            <p><strong>Gender:</strong> <%= this.gender %></p>
        <% } %>
        <% if (this.children) { %>
            <p><strong>Children:</strong></p>
            <% for (var i = 0, len = this.children.length, child; i < len; i++) { 
                child = this.children[i]; 
            %>
                <ul style="background-color: #f5f5f5;">
                    <li><strong>Name:</strong> <%= child.name %></li>
                    <li><strong>Age:</strong> <%= child.age %></li>
                    <% if (child.gender == "female") { %>
                        <li><strong>Gender:</strong> <%= child.gender %></li>
                    <% } %>
                </ul>
            <% } %>
        <% } %>
    </script>

### 渲染模板
	
	var data = {
        name: 'guoyao',
        age: 26,
        gender: 'male',
        children: [
            {
                name: 'child 1',
                age: 5,
                gender: 'female'
            },
            {
                name: 'child 2',
                age: 3,
                gender: 'male'
            }
        ]
    };
    var template = document.getElementById('template').innerHTML;
	var html = myTemplate(template, data);
	document.getElementById('content').innerHTML = html;


[演示](http://demo.guoyao.me/myTemplate/demo/)

##	模板语法
	
	<%if (this.age > 25){%>
		<%for (var i=0;i<this.children.length;i++) {%>
			<div><%=i%>. <%=this.children[i].name%></div>
		<%}%>
	<%}%>

##	下载

* [myTemplate.js](https://raw.github.com/guoyao/myTemplate/master/dist/myTemplate.js) *(未压缩版, 2.38 kb)* 
* [myTemplate.min.js](https://raw.github.com/guoyao/myTemplate/master/dist/myTemplate.min.js) *(压缩版, 767 b)*
* Install with [Bower](http://bower.io): `bower install myTemplate`.

## 方法

###	myTemplate(template, data)

如果没有 data 参数，那么将返回一渲染函数，否则直接返回渲染结果。

## 更新日志

### v0.3.0

1. 支持自定义分隔符

### v0.2.0

1. 添加Node、RequireJS支持

##	开发者

**Guoyao Wu**

+ [http://guoyao.me](http://guoyao.me)
+ [http://github.com/guoyao](http://github.com/guoyao)
+ [https://twitter.com/wuguoyao](https://twitter.com/wuguoyao)

## 授权协议

Released under the BSD License

============

© guoyao.me
