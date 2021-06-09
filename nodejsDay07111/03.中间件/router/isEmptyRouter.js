const express = require("express");

const router = new express.Router();

const path = require("path");

const isEmptyRouterFn = (req, res, next) => {
    //查看用户输入内容 拿到用户名和密码
    const {
        username,
        password
    } = req.query;

    //查看用户的账号和密码是否为空
    if (!username || !password) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "账号或者密码不能为空"
        })
    }

    //当处理完成需要继续向下走的话 需要调用next方法
    next();
}
//处理账号和密码是否为空的中间件
/* 
app.use()默认会处理所有的路由，第一个参数可以给他设置限定
防止其他任意路由都进入
*/
router.use('/login', isEmptyRouterFn)
router.use('/register', isEmptyRouterFn)

module.exports = router;