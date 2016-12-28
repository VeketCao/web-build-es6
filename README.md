# web-build-es6

内容：
- 交互设计提升：从操作效率、易学易用性、操作标准化等多角度提升交互水平；
- 视觉风格提升：采用紧跟潮流的设计风格，并将其标准化；
- 性能提升：进一步提升性能，主要页面和功能能达到或接近1秒响应；
- 技术提升：使用主流的前端组件化技术；

大规模阶段，前端集中办公！支持单页应用，多页应用



#构建项目

下载依赖包 npm install 
启动开发环境 npm start
编译项目，生产部署文件 npm run build


#项目目录说明

```
├── dist                            # 项目build打包压缩编译目录
├── docs                            # 项目文档放这里 
├── node_modules                    # node.js模块包文件夹 
├── src                             # 项目源码，开发目录。
  └──css                            # 样式文件
  └──fonts                          # 字体文件
  └──html                           # 入口html文件
  └──img                            # 图片
  └──js                             # 显目JS文件，这里包括了组件，js入口文件
    └──components                   # 公共基础组件
    └──entry                        # JS入口文件，文件名对应../html目录下的html文件的文件名 
    └──lib                          # 第三方库文件
    └──module                       # 业务模块，页面模块
    └──veket                        # 测试
├── .babelrc                        # babel编译规则
└── .gitignore                      # GIT忽略的目录或文件
├── package.json                    # NPM包管理配置文件，描述了一个NPM包的所有相关信息，包括作者、简介、包依赖、构建等信息。
├── README.md                       # 显目说明文件，现在你看到的这份文档，就是这个文件下写出来的。
├── webpack-dev-server.config.babel.js    # 开发构建配置文件
├── webpack-production.config.babel.js    # 生产构建配置文件
```



#webstorm webpack经常不能自动热更新问题
webstrom settings的system settings默认勾选‘safewrite’,勾选去掉就可以了
