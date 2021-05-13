---
layout: post
title: Markdown实践
date: 2017-12-17
tags: 技术积累
---

## 什么是 Markdown

Markdown 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号以最小的输入代价生成极富表现力的文档：如您正在阅读的这篇文章。它使用简单的符号标记不同的标题，分割不同的段落，**粗体** 或者 *斜体* 某些文字.
<p>
&emsp;&emsp;This blog is edited in <strong>Sublime</strong>，support for <em>MarkDown</em> preview. <center>新垣结衣</center>

<blockquote>你站在这里别动，我去给你买些橘子。</blockquote>

<blockquote>
笔落惊风雨，<br>诗成泣鬼神。
</blockquote>

</p>
　　
## 基本语法

标题            
H1 :# Header 1            
H2 :## Header 2           
H3 :### Header 3           
H4 :#### Header 4           
H5 :##### Header 5            
H6 :###### Header 6      
链接 :[Title](URL)        
加粗 :**Bold**        
斜体字 :*Italics*         
*删除线 :~~text~~          
内嵌代码 : `alert('Hello World');`        

### 列表
<pre><code>
* tuesday
* wednesday
* thursday
- friday
- saturday
- sunday
1.C++<br>
2.Java<br>
3.Python<br>
4.Scala<br>
</code></pre>

* tuesday
* wednesday
* thursday
- friday
- saturday
- sunday

1.C++<br>
2.Java<br>
3.Python<br>
4.Scala<br>

### 列表引用

>* 列表1
>* 列表2
>* 列表3

### 插入一张图片

<center><img src="https://raw.githubusercontent.com/highflykxf/blog_resources/master/entertainment/funny_1.jpg" alt="人生苦多，多coding" title="人生苦多，多coding"></center>

css 的大部分语法同样可以在 markdown 上使用，但不同的渲染器渲染出来的 markdown 内容样式也不一样，下面这些链接里面有 markdown 基本语法，你也可以在下面几个平台上尝试着写一些。

## 博客支持的高级语法

### 1. 制作一份待办事宜

- [ ] 支持以 PDF 格式导出文稿
- [ ] 改进 Cmd 渲染算法，使用局部渲染技术提高渲染效率
- [x] 新增 Todo 列表功能
- [x] 修复 图标功能

### 2. 高亮一段代码

<p><code>print &quot;coding...&quot;</code></p>


```python

@requires_authorization
class SomeClass:
    pass

if __name__ == '__main__':
    # A comment
    print 'hello world'

```


### 3. 绘制表格

<pre><code>| Src       | Desc      |  Cost |
| ----------| :--------:|------:|
| Beijing   | Nanjing   | 148.5 |
| Beijing   | Xinxiang  | 81.5  |
</code></pre>

| Src       | Desc      |  Cost |
| ----------| :--------:|------:|
| Beijing   | Nanjing   | \$148.5 |
| Beijing   | Xinxiang  | \$81.5  |




<p>本篇博客借鉴<br>
&emsp;&emsp;<a href="http://www.jianshu.com/p/1e402922ee32/" target="_blank" rel="noopener">Markdown——入门指南</a><br>
&emsp;&emsp;<a href="http://www.cnblogs.com/james-lee/p/6847906.html" target="_blank" rel="noopener">Sublime Text3 + Markdown + 实时预览</a><br>
&emsp;&emsp;<a href="http://www.jianshu.com/p/q81RER" target="_blank" rel="noopener">献给写作者的 Markdown 新手指南</a>
</p>
