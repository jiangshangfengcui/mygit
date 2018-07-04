1、设置npm全局包安装目录
		默认路径：C:User\AppData...    可以用  npm config ls 查看
		重新设置：

				先建两个目录 
					D:\nodejs\node_modules\npm\node_global
					D:\nodejs\node_modules\npm\node_cache

				然后重置config
					npm config set prefix 'D:\nodejs\node_modules\npm\node_global'
					npm config set cache  'D:\nodejs\node_modules\npm\node_cache'

				修改环境变量
				 	新建系统变量	NODE_PATH D:\nodejs\node_modules\npm\node_global\node_modules
				 	新建用户变量	PATH	D:\nodejs\node_modules\npm\node_global