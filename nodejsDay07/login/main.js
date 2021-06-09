// 入口文件
// 引入连接
require('./db/index')
// 引入mongoose
const mongoose = require('mongoose')
// 引入path模块
const path = require('path')
//引入userInfoModel
const userInfoModel = require('./model/user')
// 引入express框架
const express = require('express')
// 创建express的application对象
const app = express()

// 引入模板引擎
const ejs = require('ejs')
app.set("view engine", "ejs");
app.set("views", "views")

// 监听端口号
let port = '8080'
app.listen(port, err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('服务启动中，请访问：' + `http://127.0.0.1:${port}`);
})

// 设置默认路径，当进入端口/时，重定向进入index.html
app.get('/', (req, res) => {
  res.redirect('/index.html')
})
// 访问index.html时
app.get('/index.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/index.html')
  res.sendFile(filePath)
})
// 访问login.html时
app.get('/login.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/login.html')
  res.sendFile(filePath)
})
// 访问login.html时
app.get('/register.html', (req, res) => {
  const filePath = path.resolve(__dirname, './public/register.html')
  res.sendFile(filePath)
})

// 注册接口
app.get('/register', async (req, res) => {
  console.log(req.query);
  const { username, password } = req.query
  if (!username || !password) {
    // res.send('用户名或密码不能为空')
    // return
    const filePath = path.resolve(__dirname,'./public/err.ejs')
    return res.render(filePath,{
      errData:'账户名或者密码不能为空'
    })
  }
  const isHasName = await userInfoModel.findOne({
    username
  })
  // console.log(isHasName);
  if (isHasName){
    const filePath = path.resolve(__dirname,'./public/err.ejs')
    return res.render(filePath,{
      errData:'该账户已经被注册'
    })
  }
  const userData = await userInfoModel.create({
    username,
    password
  })
  console.log(userData);
  res.send('注册成功')
  
})

// 登陆接口
app.get('/login', async (req, res) => {
  console.log(req.query);
  const {
    username,
    password
  } = req.query
  if(!username || !password){
    const filePath = path.resolve(__dirname,'./public/err.ejs')
    return res.render(filePath,{
      errData:'账户名或者密码不能为空'
    })
  }
  const isHasUser = await userInfoModel.findOne({
    username
  })
  // 用户名不存在返回null
  if(!isHasUser){
    const filePath = path.resolve(__dirname,'./public/err.ejs')
    return res.render(filePath,{
      errData:'用户名不存在'
    })
  }
  if(isHasUser.password !== password){
    const filePath = path.resolve(__dirname,'./public/err.ejs')
    return res.render(filePath,{
      errData:'账户名或者密码错误'
    })
  }
  // res.send('登陆成功')
  // 登陆成功后重定向到首页
  const filePath = path.resolve(__dirname,'./public/center.html')
  res.sendFile(filePath)
})

// 图片接口
app.get('/static/:src',(req,res) => {
  // console.log(req.params);
  const{src} = req.params
  const filePath = path.resolve(__dirname, './static/', src)
  res.sendFile(filePath)
})