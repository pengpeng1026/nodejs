// 全局安装mongoose后引入
const mongoose = require('mongoose')
// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/atguigu',{
  // 阻止提示
  useNewUrlParser:true,
  useUnifiedTopology:true
})
// 连接成功后会调用mongoose.connection的open事件
// 连接成功一次就好，可以用once
mongoose.connection.once('open',err => {
  if(err){
    console.log(err);
    return
  }
  console.log('数据库连接成功');
})
// 设置约束条件，方便未来对某个集合进行约束
const teacherSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true,//必填项

  },
  age:Number,
  sex:String,
  hobby:[String],
  createTime:{
    type:Date,
    default:Date.now,//注意这里不要带调用，否则后续添加项的时间都是一样的
  }
})
// 创建model对象
// 两个参数，集合的名称，集合的约束对象
const teacherModel = mongoose.model('teacher',teacherSchema)

// 初始化一个teacher数据
new teacherModel({
  name:'lipeihua',
  age:99,
  sex:'male',
  hobby:['sing','dance'],
  createTime:Date.now() //创建的时候需要调用
}).save(err => {
  if(err){
    console.log(err);
    return
  }
  console.log('初始化成功');
})