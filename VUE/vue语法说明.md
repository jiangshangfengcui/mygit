1、template不能是模版的root element

2、v-for 指令不能在模版root element

3、属性中直接引用数据，标签内用{{  }} 引用数据

4、箭头函数本身没有this, 继承父级执行的上下文，不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())

5、组件不能独立存在，不能Vue实例化，必须挂载已存在element上	

6、对于属性中处理参数时，没有使用指令的属性默认为一般属性，不处理。只处理带有指令的属性，如： :href、:src

7、$refs 不是响应式的，只在第一次渲染时有值，组件mounted后为 

8、vue 渲染父组件子组件的顺序：由创建父组件开始，遇到子组件创建子组件，子组件mounted后，回到父组件mounted

9、在子组件中实用 watch 监听子组件 props 中的属性，首次创建渲染时不执行，且父组件创建不完数据传不过来

10、在组件的 beforeCreate 周期中拿不到 methods 中定已的方法和 data 中定义属性，创建vue实例时也是如此, 但到created hook 中可以拿到

11、在组件中也有 计算属性方法 computed ，在computed中能获取 data 和 props 中定义的属性

12、在加载子组件时，由父组件传过来的属性会在什么时候有值？在created hook 中能拿到data 或props 中的数据 

13、实例化 Vue 时 el 参数可以没有

14、如果父组件中没有传入子组件属性，而子组件中声明了该属性，代码不会报错

15、v-model后有参数

16、/*处理闪现页面基本结构的问题*/
    [v-cloak] {display: none;}

17、全局定义 (Global definitions) 的组件强制要求每个 component 中的命名不得重复

18、需要注意的是，export default routers 必须写在文件底部，而且后面还需要接一空行，否则无法通过 ESlint 语法验证

19、所有的属性（包括自定义事件名）自动转换成小写