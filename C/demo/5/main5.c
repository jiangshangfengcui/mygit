/*

	C 常量

		常量就像是常规的变量，只不过常量的值在定义后不能进行修改。a

		整数常量

			整数常量可以是十进制、八进制或十六进制的常量。前缀指定基数：0x 或 0X 表示十六进制，0 表示八进制，不带前缀则默认表示十进制。

			整数常量也可以带一个后缀，后缀是 U 和 L 的组合，U 表示无符号整数（unsigned），L 表示长整数（long）。后缀可以是大写，也可以是小写，U 和 L 的顺序任意。

			例：
				212         // 合法的
				215u        // 合法的
				0xFeeL      // 合法的
				078         // 非法的：8 不是八进制的数字
				032UU       // 非法的：不能重复后缀	

				85         // 十进制
				0213       // 八进制
				0x4b       // 十六进制
				30         // 整数
				30u        // 无符号整数
				30l        // 长整数
				30ul       // 无符号长整数

		浮点常量

			浮点常量由整数部分、小数点、小数部分和指数部分组成。您可以使用小数形式或者指数形式来表示浮点常量。

			当使用小数形式表示时，必须包含整数部分、小数部分，或同时包含两者。当使用指数形式表示时， 必须包含小数点、指数，或同时包含两者。带符号的指数是用 e 或 E 引入的。

			例：
				3.14159       // 合法的
				314159E-5L    // 合法的
				510E          // 非法的：不完整的指数
				210f          // 非法的：没有小数或指数
				.e55          // 非法的：缺少整数或分数


		字符常量

			在 C 中，有一些特定的字符，当它们前面有反斜杠时，它们就具有特殊的含义，被用来表示如换行符（\n）或制表符（\t）等。

			字符常量可以是一个普通的字符（例如 'x'）、一个转义序列（例如 '\t'），或一个通用的字符（例如 '\u02C0'）。

			例： 
				\ooo			一到三位的八进制数
				\xhh . . .		一个或多个数字的十六进制数

		字符串常量

			字符串字面值或常量是括在双引号 "" 中的。一个字符串包含类似于字符常量的字符：普通的字符、转义序列和通用的字符。


		定义常量

			在 C 中，有两种简单的定义常量的方式：
				
				使用 #define 预处理器： #define identifier value
				
				使用 const 关键字：const type variable = value;
	
*/


				#include <stdio.h>

				#define LENGTH 10   
				#define WIDTH  5
				#define NEWLINE '\n'
				 
				int main()
				{

					int area;  
					  
				   	area = LENGTH * WIDTH;
				   	printf("value of area : %d", area);
				   	printf("%c", NEWLINE);
				   	printf("Hello\tWorld\n\n");

				   	const int  LENGTH_c = 10;
			      	const int  WIDTH_c  = 5;
			      	const char NEWLINE_c = '\n';

			      	area = LENGTH_c * WIDTH_c;
			      	printf("value of area : %d", area);
			      	printf("%c", NEWLINE_c);
				 
				   	return 0;
				}