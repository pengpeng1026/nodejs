// 引入http模块
const http = require('http')

// 使用http模块创建一个服务，参数是一个回调函数，监听服务端的请求（当客户端请求了这个服务器，则调用回调函数）
const server = http.createServer((request, response) => {
  // 回调函数两个参数，request表示请求，response表示响应
  console.log('客户端请求中');

  // 设置响应头的属性Content-Type，规定响应头的类型和字符编码
  // response对象上有一个setHeader方法，可以设置响应头
  response.setHeader('Content-Type', 'text/plain;charset=utf-8')
  // response的end 方法就是返回响应，参数就是响应的内容
  response.end('哒咩哟，哒咩哒咩')
})


//给当前创建的服务端口号 和主机的地址，第三个参数是回调函数，服务器启动的时候调用
server.listen('8080', '192.168.17.54', () => {
  console.log('服务器启动');
})