const express = require("express");

const router = new express.Router();

const path = require("path")

//引入mongoose的当前用户信息集合
const userModel = require("../model/user");

//登录接口
router.get("/login", async (req, res) => {
    //拿到用户的登录信息
    const {
        username,
        password
    } = req.query;


    //根据username去数据库查询是否存在该用户
    const isHasUser = await userModel.findOne({
        username
    });

    //如果有没有用户名则返回用户名不存在
    // console.log(isHasUser) //如果不存在则返回null
    if (!isHasUser) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "用户名不存在"
        })
    }

    //如果用户名存在，则判断密码是否正确
    if (isHasUser.password != password) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "密码错误"
        })
    }
    console.log(isHasUser);
    // return res.send("登录成功")
    // 登陆成功后设置cookie响应给客户端，使用userID保证唯一性
    res.cookie('userID',isHasUser._id,{
        // cookie必须设置，不然默认时临时的
        // maxAge:1000*60*60*24, //http1.1提供的设置cookie有效期方法
        expires:new Date(Date.now()+1000*60*60*24),//http1.0提供的设置cookie有效期方法，值是一个时间对象
        //客户端可以通过在控制台document.cookie看到用户的cookie和设置，可以通过设置httpOnly来限制这一操作，只能服务端响应cookie
        httpOnly:true
    })
    //登录成功跳转到个人中心页
    const filePath = path.resolve(__dirname, "../views/center.html")
    res.sendFile(filePath);
})

module.exports = router;