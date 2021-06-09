// 引入模块
require('./db/index')

const userModel = require('./model/userModel')

const express = require('express')
const path = require('path')


const app = express()

const ejs = require('ejs')
app.set("view engine", "ejs");
app.set("views", "views")

app.get('/', (req, res) => {
  // 当访问默认路径的时候重定向到index.html
  res.redirect('/index.html')
})

app.get('/index.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/index.html')
  res.sendFile(filePath)
})
app.get('/login.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/login.html')
  res.sendFile(filePath)
})
app.get('/regesit.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/regesit.html')
  res.sendFile(filePath)
})

// 注册接口
app.get('/regesit', async (req, res) => {
  console.log(req.query);
  const {
    username,
    password
  } = req.query
  if (!username || !password) {
    const filePath = path.resolve(__dirname, './public/err.ejs')
    return res.render(filePath, {
      errData: '账户名或密码不能为空'
    })
  }
  const regesitData = await userModel.create({
    username: username,
    password: password
  })
  console.log(regesitData)
  res.send("注册成功");
})

// 登陆接口
app.get('/login', async (req, res) => {
  console.log(req.query);
  const {
    username,
    password
  } = req.query
  if (!username || !password) {
    const filePath = path.resolve(__dirname, './public/err.ejs')
    return res.render(filePath, {
      errData: '用户名或密码不能为空'
    })
  }
  const isHasName = await userModel.findOne({
    username
  });
  console.log(isHasName);
  // 用户名如果不存在则返回null
  if (!isHasName) {
    const filePath = path.resolve(__dirname, './public/err.ejs')
    return res.render(filePath, {
      errData: '用户名不存在'
    })
  };

  if (isHasName.password !== password) {
    const filePath = path.resolve(__dirname, './public/err.ejs')
    return res.render(filePath, {
      errData: '密码错误'
    })
  }
  //登录成功跳转到个人中心页
  const filePath = path.resolve(__dirname, "./public/center.html")
  res.sendFile(filePath);
})

// 图片接口
app.get('/static/:src', (req, res) => {
  // console.log(req.params);
  const { src } = req.params
  const filePath = path.resolve(__dirname, './static/', src)
  res.sendFile(filePath)
})

// 监听端口号
let port = '5050'
app.listen(port, err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务启动成功，请访问：' + `http://127.0.0.1:${port}`);
})