// 引入http模块
const http = require('http')

// 服务端的地址
const url = 'http://192.168.17.54:8000'

//http模块有一个request方法可以进行请求服务端（创建可客户端）
const request = http.request(url,(response) => {
  console.log('数据请求中');
  // 可以查看请求返回的状态码
  console.log(response.statusCode);

  //响应的数据是一个可读流，通过data方法监听得到
  response.on('data',(chunk) => {
    console.log(chunk.toString());

  })
  response.on('end',(chunk) => {
    console.log('数据请求完毕');
  })
})

//创建的客户端有一个end方法，可以开始发送请求
request.end()