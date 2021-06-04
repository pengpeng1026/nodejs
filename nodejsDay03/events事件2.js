//引入模块
const Emitter = require('events')
//定义子类完全继承父类
class MyEmitter extends Emitter{}
//new一个子类的实例
const myEmitter = new MyEmitter
// 给实例绑定自定义事件
myEmitter.on('heClick',()=>{
  console.log('他调用了heClick');
})
// 实例触发自定义事件
myEmitter.emit('heClick')
