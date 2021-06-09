const mongoose = require('mongoose')
// 用来对数据进行限制
const userSchema = new mongoose.Schema({
  username:String,
  password:String
})
const userModel = mongoose.model('userInfo',userSchema)

/* new peopleModel({
  name:'laowang',
  age:77
}) */
module.exports = userModel