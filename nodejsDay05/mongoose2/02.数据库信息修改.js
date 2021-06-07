// 引入模块
const mongoose = require('mongoose')
//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/atguigu',{
  // 阻止提示
  useNewUrlParser:true,
  useUnifiedTopology:true
})//有则连接，无则创建并连接
// 连接成功后，会触发mongoose.connection的open事件
mongoose.connection.once('open',err => {
  if(err){
    console.log(err);
    return
  }
  console.log('数据库连接成功');
})
// 设置Schema，方便未来对某个集合进行约束
const leaderSchema = new mongoose.Schema({
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
// 两个参数，集合的名称，约束条件
const leaderModel = mongoose.model('leader',leaderSchema)

// 修改数据
leaderModel.updateMany({age:{$lt:20}},{
  sex:'male'
})
.then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
})