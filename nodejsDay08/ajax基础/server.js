const express = require('express')

const app = express()

const path = require('path')

app.listen('5500',err => {
  if(err){
    console.log(err);
    return
  }
  console.log('http://127.0.0.1:5500');
})

// 默认接口
app.get('/',(req,res) => {
  const filePath = path.resolve(__dirname,'./index.html')
  res.sendFile(filePath)
})
// login接口
app.get('/login',(req,res) => {
  const data = {
    name:'hello',
    other:'world'
  }
  // 返回一个json数据
  res.json(data)
})