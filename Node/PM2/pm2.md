1、pm2 start app.js --env dev 启动应用并设置当前环境为env_dev对应的NODE_ENV属性的值

2、package.json增加命令
	
	"pm2": "pm2 start process.json" json启动

	调用命令启动

	npm run pm2 