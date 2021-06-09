// 启动数据库
// 引入模块
require('./db/index')

const userModel = require('./model/user')

const path = require('path')

const express = require('express')
// 创建application对象
const app = express()

// 监听端口的启动
let port = 8000
app.listen(port, err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务启动中，请访问：' + `http://127.0.0.1:${port}`);
})

// 当访问空端口/时，重定向到index.html
app.get('/', (req, res) => {
  res.redirect('/index.html')
})

// 当访问index.html
app.get('/index.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/index.html')
  res.sendFile(filePath)
})
// 当访问login.html
app.get('/login.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/login.html')
  res.sendFile(filePath)
})
// 当访问register.html
app.get('/register.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/register.html')
  res.sendFile(filePath)
})

// 注册接口
app.get('/register', async(req, res) => {
  console.log(req.query);
  const { username, password } = req.query
  if(!username || !password){
    res.send('用户名和密码不能为空')
    return
  }
  const isHasUser = await userModel.findOne({
    username
  })
  if(isHasUser){
    res.send('用户名已存在')
    return
  }
  userModel.create({
    username,
    password
  })
  res.send('注册成功')
})

// 登陆接口
app.get('/login',async(req,res) => {
  const{
    username,
    password
  } = req.query
  if(!username || !password){
    res.send('用户名和密码不能为空')
    return
  }
  const isHasUser = await userModel.findOne({
    username
  })
  if(isHasUser.password === password){
    res.send('登陆成功')

  }
  res.send('密码错误')
})