// 封装myPromise
function myPromise(exector) {
  // promise默认返回一个对象，对象有两个属性 status和value 默认分别是pending 和 undefined
  const _this = this
  this.status = 'pending'
  this.value = undefined
  _this.callback = {}
  // promise回调函数中有两个参数resolve 和reject,分别是两个函数
  function resolve(value) {
    // 当调用resolve的时候promise的属性值会发生变化
    // 由于返回的promise对象的状态只可能改变一次，因此需要判断
    if (_this.status !== 'pending') return
    _this.status = 'resolved'
    _this.value = value
    // 调用resolve后才能调用then中第一个参数（处理成功的）
    /* onResolved()
    注意这里也不能这样调用，考虑到promise中resolve或者reject是同步代码，比如直接resolve(111)
    此时就直接调用了onResolved(),而onResolved()应该是在then被执行后才能调用
    */
    // 为了保证onResolved()一定是异步的代码
    setTimeout(() => {
      _this.callback.onResolved(value)
      // _this.onResolved(value)
    })
  }
  function reject(reason) {   //reason:错误信息
    if (_this.status !== 'pending') return
    _this.status = 'reject'
    _this.value = reason
    setTimeout(() => {
      _this.callback.onRejected(reason)
      // _this.onRejected(reason)
    })
  }
  // promise函数实例化的时候就需要调用回调函数。因此exector函数需要被同步调用
  exector(resolve, reject)
}
// 实例化对象的then方法，相当于给构造函数的原型上添加一个方法
// 两个参数，处理成功和失败
myPromise.prototype.then = function (onResolved, onRejected) {
  const _this = this
  // then 是实例化对象调用，所以this也是指向的实例化对象
  /* onResolved()
    onRejected()
    注意这里不能直接这么调用，因为手写的then是同步的代码，但是promise函数的then是异步的，等到调用
    resolve和reject之后才能调用
  */
  _this.callback.onResolved = onResolved
  _this.callback.onRejected = onRejected
  // _this.onResolved = onResolved
  // _this.onRejected = onRejected
}