const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

app.get('/',(req,res) => {
  const filePath = path.resolve(__dirname,'./index.html')
  res.sendFile(filePath)
})
app.get('/img',(req,res) => {
  const filePath = path.resolve(__dirname,'./2.jpg')
  // res.sendFile(filePath)
  const rs = fs.createReadStream(filePath)
  /* 
  强制缓存在请求头中需要设置headers的“Cache-Control值为max-age=时间
  而且响应头中也需要设置，res.set()当时间不一样时，依据小的时间
  */
  res.set("Cache-Control", "max-age=10000")
  rs.pipe(res)
})

app.listen('5050',err => {
  if(err){
    console.log(err);
    return
  }
  console.log("http://127.0.0.1:5050");
})