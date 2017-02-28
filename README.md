# T-server

T-server 是基于kao搭建的web项目小框架

实现的功能有如下几个方面：前端自动化编译、页面、中间件、路由、静态文件指定、会话与存储、日志、错误处理...

## 使用说明

### 安装
```shell
$ git clone https://github.com/lijiliang/T-server.git
$ cd T-server
$ npm install
$ npm i webpack -g
$ npm i gulp -g
```
### 开发模式
```shell
npm run dev
```

### 构建模式
```shell
npm run build
```

## CLI命令(npm scripts)
| 命令            | 作用&效果      |
| --------------- | ------------- |
| npm run build   | 根据`webpack.config.js`，build出一份生产环境的代码 |
| npm run dev     | 根据`webpack.dev.config.js`，build出一份开发环境的代码 |
| npm run core:dev   | 根据`webpack.core.js`,build出一份开发环境的公共资源代码 |
| npm run core:build   | 根据`webpack.core.js`,build出一份生产环境的公共资源代码 |

## config.yml 根据自己需求修改生成路径及网址
```
env: 'local'     #当前开发环境
apiEnv: 'test'   # api环境
port: 3001       # 服务器端口
jsPrefix: 'tServer.'
domain:
    admin: 'atool.didadi.fm'    # 网站网址
    pc: 'atool.didadi.fm'    # 网站网址
    m: 'tools.didadi.fm'    # 移动端网站网址
    api: 'tool.api.didadi.fm'        # api调用网址
    static: 'atool.didadi.fm'   # 静态目录
path:
    controller: 'controllers'  # 控制器文件夹
    view: 'views'
    src: './statics/src'       # 静态源文件
    debug: './statics/debug'   # 静态生成的开发文件
    dist: './statics/dist'     # 静态生成的正式文件
appJsPath: 'app'    # js源文件目录
htmlViews: './views' # 视图文件夹名称
mapPath: './views/map' # map文件夹名称
sessionKey: 'tServer'  # koa sessionKey
```

目录结构如下：
```
T-server
│
├─bin                                       //服务端执行脚本
│  ├─run.sh                                     //运行
│  └─stop.sh                                    //中止
├─controllers                               //控制器目录
├─node_modules                              //npm包安装目录
├─libs                                      //路由及中间件文件
│  ├─controller.js                              //控制器
│  ├─helper.js                                  // 业务协助函数
│  ├─middleware.js                              // 中间件
│  ├─router.js                                  // 路由设置
│  ├─setting.js                                 // 配置文件
│  ├─tool.js                                    // 工具函数
│  └─tpl.js                                 //渲染模板模块
├─statics                                   //前端资源目录
│  ├─debug                                      //调试环境代码
│  ├─dist                                       //生产环境代码
│  └─src                                        //源代码
│     ├─html                                        //html文件目录
│     ├─img                                         //图片目录
│     └─js                                          //js目录
│        ├─_base                                        //基础模块目录
│        ├─app                                          //业务代码目录
│        │  ├─_common                                       //通用代码目录
│        │  └─_jsx                                          //React组件目录
│        └─vender                                       //核心库目录
├─views                                     //视图目录
│  └─map                                        //map文件目录
├─app.js                                    //启动http服务
├─config.js                                 //项目配置补充文件
├─config.json                               //项目配置文件
├─favicon.ico                               // ico文件
├─gulpfile.js                               // gulp配置
├─package.json                              //npm包配置文件
├─README.md                                 // 说明文件
├─webpack.config.js                         // 构建模式配置
├─webpack.core.js                           // 核心文件构建
└─webpack.dev.js                            // 开发模式配置
```
