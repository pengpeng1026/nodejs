const express = require('express')

const app = express()
const fs = require('fs')
const path = require('path')
const eTag = require('etag')
const { promisify } = require('util')

app.get('/',async (req,res) => {
  const filePath = path.resolve(__dirname,'./index.html')
  // 使用res.sendFile就已经把协商缓存设置好了
  const rs = fs.createReadStream(filePath)

  //在接收请求的时候，先获取请求头携带的if-none-match 和 if-modified-since
  const ifNoneMatch = req.headers['if-none-match']
  const ifModifiedSince = req.headers['if-modified-since']
  
  // fs文件系统有一个stat方法，可以得到文件的信息
  const stat = promisify(fs.stat)
  const fileDetail = await stat(filePath)
  // console.log(fileDetail);
  //得到文件的最后修改时间
  const lastChange = fileDetail.mtime.toGMTString()
  // console.log(lastChange);
  // 得到文件的唯一标识
  const onlyTag = eTag(fileDetail)
  // console.log(onlyTag);
  // 判断请求字段中的标识和最后修改时间是否和服务器保存的一样
  if(ifNoneMatch === onlyTag && ifModifiedSince === lastChange){
    return res.status(304).end()
  }
  // 如果不一样，重新发送etag和last-modified
  res.set('ETag',onlyTag)
  res.set('Last-Modified',lastChange)
  rs.pipe(res)
  // res.sendFile(filePath)
})


app.listen('8080',err => {
  if(err){
    console.log(err);
    return
  }
  console.log("http://127.0.0.1:8080");
})