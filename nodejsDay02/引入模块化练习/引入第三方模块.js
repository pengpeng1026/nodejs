// 引入第三方模块，一般第三方模块都是在node_modules文件夹中，每一个模块都是在一个文件夹中
// 引入第三方模块不用写路径的原因是执行require方法时会自动在每一层寻找node_modules文件夹，再在其中找对应的模块
const { mix } = require('mix')
console.log(mix(4,5));