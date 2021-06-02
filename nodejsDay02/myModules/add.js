function add (...rest){
  return rest.reduce((p,i) => {
    return p + i
  })
}
// 将add方法暴露出去
module.exports.add = add
