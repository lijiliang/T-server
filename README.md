# T-server

T-server 是基于kao搭建的web项目小框架

任何web前端项目都必须有几个方面：页面、中间件、路由、静态文件指定、会话与存储、日志、错误处理...

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

## node
- 服务、路由、中间件、ejs模板、日志、静态文件

疑问：
- koa的中间件机制是如何实现的？
- 为什么中间件必须是generator function?
- next实参指向是什么？为什么可以通过yield next可以执行下一个中间件？
- 为什么中间件从上而下执行完后，可以从下到上执行yield next后的逻辑？
https://cnodejs.org/topic/56936889c2289f51658f0926
