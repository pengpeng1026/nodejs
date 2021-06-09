// 用来设置约束
const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
  username:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true
  }
})

//创建集合
const userInfoModel = mongoose.model('user',userInfoSchema)
// 暴露出userInfoModel
module.exports = userInfoModel