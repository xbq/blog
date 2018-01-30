var express = require('express');
var router = express.Router();
var User = require('../models/User')
router.use(function (req,res,next) {
    if(!req.userInfo.isAdmin){
        res.send('对不起，只有管理员才能进入此页面');
        return;
    }
    next();
});

/**
 * 首页
 */
router.get('/',function(req,res,next){
    res.render('admin/index',{
        userInfo:req.userInfo
    })
});

/**
 * 用户管理
 */
router.get('/user',function (req,res) {
    /**
     *读取用户表
     */
    User.find().then(function (users) {
        res.render('admin/userIndex',{
            userInfo:req.userInfo,
            users:users
        })
    });
});

router.get('/user/manage',function(req,res){
    /**
     *读取用户表
     */
    var page = req.query.page||1;
    var limit =Number(req.query.limit);
    var skip = (page-1)*limit;
    User.count().then(function (count) {
        User.find().skip(skip).limit(limit).then(function (users) {
            res.json({
                code:0,
                count:count,
                data:users,
                message:""
            });
        });
    });

});

module.exports=router;