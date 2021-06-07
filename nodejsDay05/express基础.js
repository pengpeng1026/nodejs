// 引入express模块
const express = require('express')
// 创建express的application对象
const app = express()

const path = require('path')

// 书写接口
app.get('/',(req,res) => {
  /* console.log('/被请求了');
  console.log(req.method);//默认是GET请求
  console.log(req.query);//返回GET请求的查询字符串组成的对象
  console.log(req.url);//返回请求的路径信息
  res.send('ninh') */
  // end不会返回响应头的content-type
  // send会返回响应头的content-type
  // res.end('hello')

  res.json({
    'name':'ruoyan'
  })
  // 重定向
  res.redirect('http://www.baidu.com')
})
// 监听端口的请求
app.listen(3001, err => {
  if(err){
    console.log(err);
    return
  }
  console.log('服务器启动中，请访问端口：' + `127.0.0.1:3001`);
})
