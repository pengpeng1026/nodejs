/* const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000); */

// 当暴露的方法在对象中的时候，接收的是一个对象
//可以使用解构赋值的方法拿到这个方法
const {add} = require('../myModules/add') //引入自定义模块后面的js后缀可以省略
console.log(add(1,4,5));
// 当暴露的方法直接是一个方法时，直接接收
const sub = require('../myModules/sub')
console.log(sub(5,6));