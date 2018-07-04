1、npm list -g --depth 0   查看全局安装包

2、npm uninstall -g <package>  删除全局模块
	npm uninstall <package>		删除模块，但不删除package.json中的对应信息
	npm uninstall --save <package> 	删除模块，同时删除模块在package.json中dependencies的对应信息
	npm uninstall --save-dev <package> 删除模块，同时删除模块在package.json中devDependencies的对应信息

	–save-dev 安装的 插件，被写入到 devDependencies 对象里面去

	–save 安装的 插件 ，被写入到 dependencies 对象里面去

	npm i -D uglifyjs-webpack-plugin 

	npm i mint -ui -S

3、npm update [-g] [<pkg>...]

4、更换安装源

	1.通过config命令
	npm config set registry https://registry.npm.taobao.org
	npm info underscore （如果上面配置正确这个命令会有字符串response）

	2.命令行指定
	npm --registry https://registry.npm.taobao.org info underscore

5、npm install -g nrm    nrm 是一个 NPM 源管理器
	
	1) 列出可选的源
		
		nrm ls
		* npm ---- https://registry.npmjs.org/
		  cnpm --- http://r.cnpmjs.org/
		  taobao - http://registry.npm.taobao.org/
		  eu ----- http://registry.npmjs.eu/
		  au ----- http://registry.npmjs.org.au/
		  sl ----- http://npm.strongloop.com/
		  nj ----- https://registry.nodejitsu.com/

		带 * 的是当前使用的源，上面的输出表明当前源是官方源。
	2) 切换

		nrm use taobao

		Registry has been set to: http://registry.npm.taobao.org/

	3) 增加源

		nrm add    [home]

	4) 删除源

		nrm del

	5) 测试速度

		nrm test npm

		npm ---- 1328ms

	6) 测试所有源的响应时间

		nrm test
		  npm ---- 891ms
		  cnpm --- 1213ms* taobao - 460ms
		  eu ----- 3859ms
		  au ----- 1073ms
		  sl ----- 4150ms
		  nj ----- 8008ms
