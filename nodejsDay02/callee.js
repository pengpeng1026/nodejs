console.log(arguments);
// arguments.callee打印出的是函数本身
console.log(arguments.callee);
console.log(arguments.callee.toString());
/* 
function (exports, require, module, __filename, __dirname) {

}
*/
/* 
    exports:指向的对象 就是被暴露的对象
    require:用来引入其他模块
    module: 真正用来暴露模块 里边有一个module.exports方法
    __filename:当前文件的绝对路径
    __dirname：当前文件所在文件夹的绝对路径
*/