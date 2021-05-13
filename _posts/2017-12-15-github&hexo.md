---
layout: post
title: "使用github+hexo搭建博客"
date: 2017-12-15
description: "使用github+hexo搭建博客"
tags: 技术积累
---


## 常用命令:

<pre>
    hexo new “post_name”–create post or article
    hexo new page “page_name”–create page
    hexo new draft “draft_name”–crate new draft
    hexo publish [layout] –change draft to article or page
    hexo generate–create static file
    hexo server–open local web server
    key combinations
    hexo d -g #create deploy
    hexo s -g #create preview
</pre>

## 博客构建流程

### step 1: install Node.js and hexo
<pre>
    (1) verify the installtion of node.js
        node -v
    (2) download and install hexo
        npm install -g hexo-cli(npm install hexo-cli -g)
        verify: hexo -v
    (3) initial hexo and create website homepage
        hexo init blog_name
        cd blog_name
        npm install
        hexo g #hexo generate(Explanation: generate static files, create a new folder called “public”)
        hexo s #hexo server (Exp: open the local web server, preview the blog. Visit blog by <a href="http://localhost:4000" target="_blank" rel="noopener">http://localhost:4000</a>)
</pre>

### step 2: set theme
<pre>
    (1) install theme
        git clone <a href="https://github.com/litten/hexo-theme-yilia.git" target="_blank" rel="noopener">https://github.com/litten/hexo-theme-yilia.git</a> themes/yilia
    (2) enable theme
        set the attribution value of theme in file “_config.yml” as “yilia”
    (3) update theme
        cd themes/yilia
        git pull
        hexo -s g
</pre>

### step 3: deploy hexo to github page
<pre>
    (1) install the github extension of hexo
        npm install hexo-deployer-git –save
    (2) modify the configuration file
        deploy:
          type: git
          repo: git@github.com:your_name/your_name.github.io.git
          branch: master
</pre>
