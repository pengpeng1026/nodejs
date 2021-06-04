// 引入http模块
const http = require('http')

// 使用http模块创建一个服务端
const server = http.createServer((request, response) => {
  // 参数是一个回调函数，在客户端请求该服务端的时候调用
  // 响应参数response上有一个setHeader方法，参数是设置文本类型，以及规定字符
  response.setHeader('Content-Type', 'text/plain;charset=utf-8')
  // 响应参数response的end方法，参数是返回的响应的数据
  response.end('哒咩哟，哒咩哒咩')
})

// 给服务端设置地址和响应端口号
server.listen('8000','192.168.17.54',()=>{
  // 服务端接收到请求和调用该回调，可以打印提示
  console.log('服务启动中');
})