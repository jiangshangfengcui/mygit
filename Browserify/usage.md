在运行打包命令时将 NODE_ENV 设置为 "production"。这等于告诉 vueify 避免引入热重载和开发相关的代码。
对打包后的文件进行一次全局的 envify 转换。这使得压缩工具能清除调 Vue 源码中所有用环境变量条件包裹起来的警告语句。例如：

NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js  (shell)