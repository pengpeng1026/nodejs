// 引入mongoose模块
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/atguigu',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
// 连接成功后，会触发mongoose.connection的open事件
// 用on关键字，因为数据库连接成功一次就可以了，所有可以用once最好
mongoose.connection.once('open',(err) => {
  if(err){
    console.log(err);
    return
  }
  console.log('数据库连接成功');
})
// 创建schema对象，方便未来对某个集合进行约束
// 对一个集合进行约束
const studentSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true, //必填项
  },
  age:Number,
  sex:String,
  hobby:[String],
  createTime:{
    type:Date,
    default:Date.now
  }
})
// 创建model对象（集合）
// 两个参数，集合的名字，集合的约束对象
const studentModel = mongoose.model('student',studentSchema)

// 初始化数据库，也可以不用初始化
new studentModel({
  name:'peng',
  age:22,
  sex:'male',
  hobby:'football',
}).save(err => {
  if(err){
    console.log(err);
    return
  }
  console.log('数据库初始化成功');
})



