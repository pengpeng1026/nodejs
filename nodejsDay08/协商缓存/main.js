const express = require('express')

const app = express()

const fs = require('fs')
const path = require('path')
app.get('/',(req,res) => {
  const filePath = path.resolve(__dirname,'./index.html')
  // 使用res.send()默认读取缓存
  const rs = fs.createReadStream(filePath)
  rs.pipe(res)
})

app.listen('3004',err => {
  if(err){
    console.log(err);
    return
  }
  console.log('http://127.0.0.1:3004');
})