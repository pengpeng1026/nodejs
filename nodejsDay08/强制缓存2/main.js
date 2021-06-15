const express = require('express')

const app = express()

const path = require('path')

const fs = require('fs')

app.listen('3003',err => {
  if(err){
    console.log(err);
    return
  }
  console.log('http://127.0.0.1:3003');
})

// 默认接口
app.get('/',(req,res) => {
  const filePath = path.resolve(__dirname,'./index.html')
  res.sendFile(filePath)
})

// img接口
app.get('/img',(req,res) => {
  const filePath = path.resolve(__dirname,'./lijing.jpg')
  // 使用res.sendFile()则默认是协商缓存
  const rs = fs.createReadStream(filePath)
  // 返回响应的时候响应头设置Cache-Control 和max-age
  res.set('Cache-Control','max-age=100000')
  rs.pipe(res)
})