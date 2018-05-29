1、查看全局安装包    npm list -g --depth 0
2、卸载插件 		 npm uninstall <name> [-g] [--save-dev]
3、更新插件			 npm update <name> [-g] [--save-dev]
4、更新全部插件		 npm update [--save-dev]
5、删除本地node_modules的命令 
					 安装 npm install rimraf -g 
					 执行 rimraf node_modules
6、自动重启NodeJS后台服务器的命令
					 安装 npm install -g nodemon
					 执行 nodemon server.js