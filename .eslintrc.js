module.exports = {
  /**
   * 文件内局部设置
   * 【】eslint可以具体文件中设置特定代码的规则，常用于跳过某条语句的检测。
   * 【】注销全部规则，在代码前新建一行，添加注销 /* eslint-disable *\/  。如果没有恢复设置的语句，则下列全部代码都会跳过检测。
   * 【】恢复eslint，在代码前新建一行，添加注销 /* eslint-enable *\/
   * 【】指定忽略的规则，/* eslint-disable no-alert, no-console *\/
   * 【】在特定行禁用，// eslint-disable-line
   * 【】在下一行禁用，// eslint-disable-next-line
   */

  // 标识当前配置文件为eslint的根配置文件，让其停止在父级目录中继续寻找。
  root: true,
  // 此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    node: true
    // jquery: true
  },
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写，如果你使用vs-code我觉得应该可以避免出错
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  /*
   下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
  */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0, // 函数左边不要有括号
    indent: 0, // script的缩进
    'no-unused-vars': 1, // 不能有声明后未被使用的变量或参数
    eqeqeq: 0 // 允许使用双等号
  },
  parserOptions: { // eslint解析器配置项
    // 解析器是用于解析js代码的，怎么去理解每一个表达式，有点C++中编译器的概念，会对js进行一些语法分析，语义分析什么的，才能判断语句符不符合规范。而不是通过简单的字符串对比。
    parser: 'babel-eslint'// 指定eslint解析器：babel-eslint是围绕Babel解析器的包装器使其与ESLint兼容；可能值espree、esprima
  }
}
