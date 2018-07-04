/*

	C 变量

	变量类型

		char 	通常是一个字节（八位）。这是一个整数类型。

		int		对机器而言，整数的最自然的大小。

		float 	单精度浮点值。单精度是这样的格式，1位符号，8位指数，23位小数。
				符号位（31）指数位（30-23）小数位（22-0）

		double  双精度浮点值。双精度是1位符号，11位指数，52位小数。
				符号位（63）指数位（62-52）小数位（51-0）

		void	表示类型的缺失。


		C 语言也允许定义各种其他类型的变量，比如枚举、指针、数组、结构、共用体等等


		定义变量

			type variable_list = value; // type 代表char、int、float、double、void、bool、自定义的对象、
											// 不初始化定义的变量隐式初始化为 NULL

		变量声明

			变量的声明有两种情况：

			1、一种是需要建立存储空间的。例如：int a 在声明的时候就已经建立了存储空间。
			
			2、另一种是不需要建立存储空间的，通过使用extern关键字声明变量名而不定义它。 例如：extern int a 其中变量 a 可以在别的文件中定义的。
			
			除非有extern关键字，否则都是变量的定义。

			例：
				extern int i; //声明，不是定义
				int i; //声明，也是定义


		C 中的左值（Lvalues）和右值（Rvalues）
*/

#include <stdio.h>
#include "common4.h" // 使用 #include 引进文件实际上是将该文件的代码搬到此处
 
// 变量声明
extern int a, b;
extern int c;
extern float f;
extern int key;  //  key 在 common4.h 中声明初始化，，在这引用

// printf("key = %d \n", key);
 
int main ()
{
  /* 变量定义 */
  int a, b;
  int c;
  float f;
 
  /* 初始化 */
  a = 10;
  b = 20;
  
  c = a + b;
  printf("value of c : %d \n", c);
 
  f = 70.0/3.0;
  printf("value of f : %f \n", f);

  printf("main函数中打印 key = %d \n", key);
 
  return 0;
}