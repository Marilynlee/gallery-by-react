# gallery-by-react
one photo gallery project based on react!

此项目根据慕课网Mater Liu老师的React实战-打造画廊应用课程完成，非常感谢老师的课程！但由于前端工具版本更新，项目的搭建和视频稍有不同。本项目涉及到的技术有React、webpack、sass、ES6等。

# 项目环境搭建
1、安装Yeoman：由于Yeoman本身基于nodeJS构建，所以首先本地安装nodeJS（https://nodejs.org/en/） 一键傻瓜式安装不多说了。安装Yeoman，使用<code>npm install -g yo</code>安装Yeoman。

2、安装generator：在Yeoman官网（yeoman.io）Disgovering Generators中查找react-webpack,按要求安装generator：<code>npm install -g generator-react-webpack</code>

# 创建项目
1、登录自己的Github账号创建相应仓库，使用本地Git将代码clone下来，进入项目目录，运行<code>yo react-webpack</code>生成项目，按照CMD提示完成操作，这里我们选use sass、enable postcss。然后项目会自动安装，如果安装失败，自己运行<code>npm install</code>。由于前面enable postcss所以要运行<code>npm install autoprefixer</code>install PostCSS plugins。

2、项目结构：  
--node_modules 项目编译所需node组件的包  
--src 项目源代码所在目录  
--test 项目测试代码所在目录  
--.editorconfig 统一不同编辑器代码规范  
--.babelrc 代码风格检测工具  
--.eslintrc 代码风格检测工具  
--.yo-rc Yeoman配置文件，记录项目信息  
--karma.conf.js karma测试框架的配置文件  
--package.json node项目的配置文件，声明项目所依赖的npm包  
--webpack.config.js webpack开发环境配置文件  
注意：由于react-webpack2.0已经抛弃了Grunt，所以本目录中没有Gruntfile.js文件和webpack.dist.config.js文件（webpack生产环境配置文件）

3、启动项目：<code>npm start</code> or <code>npm run serve</code>

# 项目开发前准备
1、安装autoprefixer-loader：修改项目webpack配置以使css兼容各个浏览器，自动添加厂商前缀。运行<code>npm install autoprefixer-loader --save-dev</code>-save-dev使得包依赖添加至package.json文件依赖配置项

2、同理，安装json-loader：运行<code>npm install json-loader --save-dev</code>。安装node-sass：运行<code>npm install node-sass --save-dev</code>。安装sass-loader：运行<code>npm install sass-loader --save-dev</code>。

# 项目运行
使用Git clone本项目代码之后，首先运行<code>npm install</code>安装node依赖的模块，在运行<code>npm start</code>即可！

# node-sass报错解决办法
如果启动<code>npm start</code>时候，<code>node-sass</code>依赖包报错Error: ENOENT: no such file or directory, scandir '\node_modules\.npminstall\node-sass\3.7.0\node-sass\vendor'。先运行<code>npm rebuild node-sass</code>在启动项目

点此https://marilynlee.github.io/gallery-by-react/ 查看项目在线地址

