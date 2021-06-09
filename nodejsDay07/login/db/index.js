// 用来连接数据库
const mongoose = require('mongoose')
// 连接
mongoose.connect('mongodb://127.0.0.1:27017/login',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 监听服务器连接成功
mongoose.connection.once('open',err => {
  if(err){
    console.log(err);
    return
  }
  console.log("数据库连接成功");
})