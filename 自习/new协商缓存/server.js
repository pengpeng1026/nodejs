const express = require('express')

const app = express()
const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const etag = require('etag')
// 设置接口
app.get('/',async (req,res) => {
  const filePath = path.resolve(__dirname,'./index.html')
  // 如果时直接res.sendFile，则会自动协商缓存
  const rs = fs.createReadStream(filePath)
  // 服务器先获取请求中携带的文件信息字段
  const ifNoneMatch = req.headers['if-none-match']
  const ifModifiedSince = req.headers['if-modified-since']
  // fs文件系统中有个stat 方法可以获取文件信息
  const stat = promisify(fs.stat)
  const fileDetail = await stat(filePath)
  // console.log(fileDetail);
  // 获取文件的最后修改时间
  const fileTime = fileDetail.mtime.toGMTString()
  // 使用etag包可以获取文件的唯一标识
  const fileTag = etag(fileDetail)
  // 服务器在响应之前先判断请求头中的文件信息和保存的是否一致
  if(ifNoneMatch == fileTag && ifModifiedSince == fileTime){
    // 如果一致，先设置响应状态码，再响应空内容
    return res.status(304).end()
  }
  // 否则重新将唯一标识和最后修改时间响应过去
  res.set('ETag',fileTag)
  res.set('Last-Modified',fileTime)
  rs.pipe(res)
})


app.listen('5555',err => {
  if(err){
    console.log(err);
    return
  }
  console.log("http://127.0.0.1:5555");
})