const mongoose = require('mongoose')
// 用来对数据进行限制
const peopleSchema = new mongoose.Schema({
  name:String,
  age:Number
})
const peopleModel = mongoose.model('people',peopleSchema)

/* new peopleModel({
  name:'laowang',
  age:77
}) */
module.exports = peopleModel