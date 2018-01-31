var express = require('express');
var router = express.Router();
//返回一个User构造函数，这个构造函数有很多静态函数和实例函数
var User = require('../models/User');
//统一返回格式
var responseData = {};

//初始化处理
router.use(function(req,res,next){
    responseData = {
        code:0,
        message:''
    };
    next();
});
router.post('/user/register',function (req,res,next) {
    console.log(req.body);
    var reqBody = req.body;
    var username = reqBody.username;
    var password = reqBody.password;
    var repassword = reqBody.repassword;
    if(username==''){
        responseData.code = 1;
        responseData.message='用户名不能为空';
        res.json(responseData);
        return;
    }

    if(password==''){
        responseData.code =2;
        responseData.message='密码不能为空';
        res.json(responseData);
        return;
    }
    if(repassword==''){
        responseData.code =3;
        responseData.message='确认密码不能为空';
        res.json(responseData);
        return;
    }else if(repassword!=password){
        responseData.code = 4;
        responseData.message='两次密码输入不一致';
        res.json(responseData);
        return;
    }

    //验证用户是否被注册
    User.findOne({
        username:username
    }).then(function (userInfo) {
        if(userInfo){
            //表示数据库中有username存在
            responseData.code = 5;
            responseData.message='用户已经被注册';
            res.json(responseData);
            return;
        }else{
            //添加
            var user = new User({
                username:username,
                password:password
            });
            user.save().then(function (value) {
                console.log(value);
                responseData.message='数据操作成功';
                res.json(responseData);
            });;
        }
    })

});

router.post('/user/login',function (req,res,next) {
    if(req&&req.body){
        var username = req.body.username;
        var password = req.body.password;
        if(username==""){
            responseData.code=1;
            responseData.message = "用户名不能为空";
            res.json(responseData);
            return;
        }
        if(password==""){
            responseData.code=2;
            responseData.message = "密码不能为空";
            res.json(responseData);
            return;
        }


        //查询数据库，验证用户名密码是否正确
        User.findOne({
            username:username,
            password:password
        }).then(function(userInfo){
            if(!userInfo){
                responseData.code=3;
                responseData.message= "用户名或密码错误";
                res.json(responseData);
                return;
            }else{
                responseData.message="登陆成功";
                responseData.userInfo = {
                    _id :userInfo._id,
                    username:userInfo.username
                };
                req.cookies.set('userInfo',JSON.stringify({
                    _id:userInfo._id,
                    username:userInfo.username,
                    isAdmin:userInfo.isAdmin
                }));
                res.json(responseData);
            }
        });
    }

});

router.get('/user/logout',function (req,res,next) {
    req.cookies.set('userInfo',null);
    res.json(responseData);
});
module.exports = router;