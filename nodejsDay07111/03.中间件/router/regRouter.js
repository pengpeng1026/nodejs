const express = require("express");

const router = new express.Router();

const path = require("path");

const regRouterFn = (req, res, next) => {
    //查看用户输入内容 拿到用户名和密码
    const {
        username,
        password
    } = req.query;

    const userReg = /^[0-9a-zA-Z_]{6,15}$/;
    const passReg = /^[0-9]{1,15}$/;
    // 正则的test（）方法
    if (!userReg.test(username) || !passReg.test(password)) {
        //拼接err.ejs的路径
        const filePath = path.resolve(__dirname, "../views/err.ejs");
        return res.render(filePath, {
            errData: "账号和密码格式不对"
        })
    }
    // 调用next（）方法继续向下执行
    next();

}
//处理账号和密码的正则校验
router.use('/login',regRouterFn)
router.use('/register',regRouterFn)


module.exports = router;