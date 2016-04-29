# base-project
基于 gulp 构建的一个基本前端自动化项目；此项目的主要目的在于可以基于现有的目录结构和 task 快速搭建一个前端开发的项目，节省手动创建和配置的时间。

## 基本目录结构
![目录](https://ooo.0o0.ooo/2016/04/28/5722cb9e3676f.png)
使用 源码 / 发布目录 结构

## 构建任务
###gulp server
开发的时候启用 server 服务，会自动监听文件的变动、编译 less 文件并且刷新浏览器

### gulp
默认任务 gulp 为打包任务，包含 gulp mincss、gulp minjs、gulp minimg 三个任务，可以单独执行其中的一个任务