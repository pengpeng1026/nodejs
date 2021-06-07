//这里也需要引用mongoose模块
const mongoose = require('mongoose')
// 设置数据类型限制Schema，方便未来对某个集合进行限制
const supportSchema = new mongoose.Schema({
  name:String,
  age:Number,
  sex:String,
  createTime:{
    type:Date,
    dafault:Date.now
  }
})
// 创建数据对象
// 两个参数，集合的名称，约束条件
const supportModel = mongoose.model('support',supportSchema)

// 将数据集合暴露出去
module.exports = supportModel
