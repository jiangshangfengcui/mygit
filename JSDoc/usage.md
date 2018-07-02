JSDoc 介绍

	什么是JSDoc 

		根据javascript文件中注释信息，生成JavaScript应用程序或库、模块的API文档的工具。
		用来记录命名空间，类，方法，方法参数等。类似JavaDoc和PHPDoc。现在很多编辑器或IDE中还可以通过JSDoc直接或使用插件生成智能提示。从而使开发者很容易了解整个类和其中的属性和方法，并且快速知道如何使用，从而提高开发效率，降低维护成本。

	JSDoc注释

		一般应该放置在方法或函数声明之前

		以/ **开始

		以/*，/***或者超过3个星号的注释，都将被JSDoc解析器忽略


		/**
		 * Book类，代表一个书本.
		 * @constructor
		 * @param {string} title - 书本的标题.
		 * @param {string} author - 书本的作者.
		 */
		function Book(title, author) {
		    this.title=title;
		    this.author=author;
		}
		Book.prototype={
		    /**
		     * 获取书本的标题
		     * @returns {string|*}
		     */
		    getTitle:function(){
		        return this.title;
		    },
		    /**
		     * 设置书本的页数
		     * @param pageNum {number} 页数
		     */
		    setPageNum:function(pageNum){
		        this.pageNum=pageNum;
		    }
		};


	JSDoc注释标签

		关于别名

			 比如@param有两个别名：

			 	@arg
			 	@argument

			 	