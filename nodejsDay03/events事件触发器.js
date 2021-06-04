// 获取对应模块
const Emmits = require('events')
// 子类完全继承父类，相当于拷贝了一份
class MyEmmits extends Emmits{}
// new一个子类的实例
const myEmmits = new MyEmmits()
// 给实例绑定自定义事件
myEmmits.on('youClick',() => {
  console.log('调用了youClick');
})
// emit方法触发事件
myEmmits.emit('youClick')