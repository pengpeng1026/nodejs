// 约束和创建集合
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
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
const userModel = mongoose.model('user',userSchema)
// 暴露集合
module.exports = userModel