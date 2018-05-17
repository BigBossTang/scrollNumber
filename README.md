# scrollNumber
基于mui+jquery的数字滚动插件

使用方法如下：
1.在保证项目引入了mui和jquery的前提下，引入scroll.js和scroll.css，
2.页面注册使用 scrollInit(node,num,callback); node:挂载的dom节点，num：scroll条目数（数字），callback:滑动停止后的回调函数，返回所有scroll当前值的数组。

功能：暂时只支持数字0-9的滑动选择，条目数没有限制。
