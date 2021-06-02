/* 
- 默认情况下模块内部代码对于外部来说都是不可见的，可以通过两种方式向外部暴露变量和函数
  - 两种方法暴露
    - module.exports
        - 默认是一个对象{}，是真正暴露的对象，也就是module.exports指向的对象是谁，就暴露谁
    - exports
        - 是module.exports的一个引用，指向的是module.exports默认对象
*/
function add(...rest) {
  return rest.reduce((p, i) => {
    return p + i
  })
}
modlues.exports.add = add
/* 如果函数内部有多种方法同时暴露，可以这样写
modlues.exports = {
  add,
  sub
} 
*/

function sub(a, b) {
  return a - b
}
exports.add = add
/* 
不可以直接写exports = add ,因为这样相当于将exports的引用指向了add
*/