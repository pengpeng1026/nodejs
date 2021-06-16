// 封装myPromise
function myPromise(exector){
  // promise默认返回一个对象，对象有两个属性 status和value 默认分别是pending 和 undefined
  const _this = this 
  this.status = 'pending'
  this.value = undefined
  // promise回调函数中有两个参数resolve 和reject,分别是两个函数
  function resolve(value){
    // 当调用resolve的时候promise的属性值会发生变化
    // 由于返回的promise对象的状态只可能改变一次，因此需要判断
    if(_this.status !== 'pending') return 
    _this.status = 'resolved'
    _this.value = value
  }
  function reject(reason){   //reason:错误信息
    if(_this.status !== 'pending') return 
    _this.status = 'reject'
    _this.value = reason
  }
  // promise函数实例化的时候就需要调用回调函数。因此exector函数需要被同步调用
  exector(resolve,reject)
}