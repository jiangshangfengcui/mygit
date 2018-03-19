1、引用

	在浏览器引用:
					<script src="numeral.js"></script> 
					或者
					<script src="//csdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
	在node中引用:	
					npm install numeral
					var numeral = requier('numeral');

2、API
   		var myNumeral = numeral();    执行这条语句返回一个数字对象

		numeral.js 的对象封装的结构是这样的：

				(function (global, factory) {
				    if (typeof define === 'function' && define.amd) {
				        define(factory);
				    } else if (typeof module === 'object' && module.exports) {
				        module.exports = factory();
				    } else {
				        global.numeral = factory();
				    }
				}(this, function () {
					var numeral;						// 数字对象函数
					function Numeral () {}   			// 数字对象构造器，当执行数字对象函数的时候返回
					numeral = function() {} 			// 数字对象函数 numeral 定义
					numeral.version = VERSION;			// 版本号
					numeral.isNumeral = function(obj) {} // 判断传入的对象是不是一个数字对象 instanceof
					numeral._ = _ = {					// 内部调用
						stringToNumber: function() {},				// 
						isNaN: function(value) {},					// 判断value是不是一个数
						includes: function (string, search) {},  // 判断String是否包含search !== -1
						insert: function(string, subString, start) {}, // 在string中第start个字符后插入subString
						reduce: function(array, callback /*, initialValue*/) {},
						multiplier: function() {},
						correctionFactor: function () {},
						toFixed: function () {}
					};
					numeral.options = options;
					numeral.formats = formats;
					numeral.locales = locales;
					numeral.locale = function () {};
					numeral.localeData = function () {};
					numeral.reset = function () {};
					numeral.zeroFormat = function () {};
					numeral.nullFormat = function () {};
					numeral.defaultFormat = function ()  {};
					numeral.register = function () {};
					numeral.fn = Numeral.protoype = {
						clone: function () {},// 复制
						value: function () {},// 查看当前数值
						input: function () {},// 查看初始化数值
						set: function (value) {},// 重置数值
						add: function (value) {},// 加法
						subtract: function (value) {}, // 减法
						multiply: function (value) {}, // 乘法
						divide: function (value) {}, // 除法
						difference: function (value) {}, // 该数值跟value的差，结果恒正
						format: function (inputString, roundFunction) {},// 数值格式化，
						格式化数字
								'0,0.00': 整数部分以','划分位数不够不显示','，小数后有几个0保留几位
								'+0,0': 数值前显示'+'
								'0000,0.00': 整数部分前填充零
								'0,0.00[0]': 千分位不为零时保留三位
								'.00': 取小数后两位
								'0o': 转换成序数，1 -> 1st, 100 -> 100th
								'0.00a': 转换成k, 1234 -> 1.23k
						格式化字节
								'0b': 转换成大单位字节, KB, 进制1000
								'0ib': 转换成大单位字节，KiB, 进制1024
						格式化货币
								'$0.00': $在前
								'0.00$': $在后
						格式化百分数
								'0.00%': 百分数保留两位小数
						格式化时间
								'00:00:00': 转化成时分秒，0 : 00 : 25
						格式化成科学计数法
								'0.00e+0': 结果保留两位，2.22e+3
					}
				})

		*注：numeral.js 中定义在数字对象函数 numeral 上，然而 numeral 并不是对象，只是一个普通函数，但是却挂载了许多方法，当这个函数没有被 new 成一个对象的时候这些方法仍然能被调用，看懂了这里恍然对构造函数又有了新的认识