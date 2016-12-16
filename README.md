# T-server

T-server 是基于kao搭建的web项目小框架

个人认为，不管任何web前端项目都必须有几个方面：页面、中间件、路由、会话与存储、静态文件指定、日志、错误处理...

目录结构如下：
```
|——app.js               // 程序启动文件
	|——node_modules     // 项目依赖库
	|——public           // 静态文件（css，js，img）
	|    |——img
	|    |——css
	|    |——js
	|
    |——controllers          // 控制器文件
	|    |——index.js
	|    |——user.js
    |
	|——libs                 // 路由及中间件文件
	|    |——controller.js
	|    |——middleware.js
    |    |——router.js
    |    |——setting.js
    |    |——tpl.js
	|
	|——views                // 前台页面文件
	|    |——_layout.html
	|    |——index.html
	|
	|——package.json
```

https://cnodejs.org/topic/56936889c2289f51658f0926
