// 引入模块
// require('./db/index')


const express = require('express')
const path = require('path')


const app = express()

// 引入模板引擎
// 后端渲染
const ejs = require('ejs')
app.set('view engine','ejs')
app.set('views','views')
app.get('/',(req,res) => {
  const filePath = path.resolve(__dirname,'index.ejs')
  const data = 'nnnnnnnnnn'
  const userInfo = {
    name:'anni',
    age:20,
    gender:'male'
  }
  res.render(filePath,{
    data,
    userInfo
  })
})

// 监听端口号
let port = '5050'
app.listen(port, err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务启动成功，请访问：' + `http://127.0.0.1:${port}`);
})