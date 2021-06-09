// 专门用来连接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/testlogin',{
  useUnifiedTopology:true,
  useNewUrlParser:true
})

// 连接，监听
mongoose.connection.once('open',err => {
  if(err){
    console.log(err);
    return
  }
  console.log('数据库连接成功');
})