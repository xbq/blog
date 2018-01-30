var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');

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
    res.render('admin/userIndex',{
        userInfo:req.userInfo
    })
});

/**
 * 用户列表
 */
router.get('/user/list',function(req,res){
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

/**
 * 分类管理
 */
router.get('/category',function (req,res) {
    res.render('admin/category',{
        userInfo:req.userInfo
    })
});

/**
 * 分类列表
 */
router.get('/category/list',function(req,res){
    /**
     *读取用户表
     */
    var page = req.query.page||1;
    var limit =Number(req.query.limit);
    var skip = (page-1)*limit;
    Category.count().then(function (count) {
        Category.find().skip(skip).limit(limit).then(function (categories) {
            res.json({
                code:0,
                count:count,
                data:categories,
                message:""
            });
        });
    });

});


/**
 * 添加分类页面
 */
router.get('/category/add',function (req,res) {
    res.render('admin/addCategory',{
        userInfo:req.userInfo
    })
});

/**
 * 添加分类
 */
router.post('/category/add',function(req,res){
    /**
     *读取用户表
     */
    var reqBody = req.body;
    var name = reqBody.name||"";
    if(name==""){
        responseData.code=1;
        responseData.message = "类别名称不能为空"
        res.json(responseData);
        return;
    }else{
        Category.findOne({
            name:name
        }).then(function (category) {
            if(category){
                responseData.code=1;
                responseData.message = "该类别已经存在！"
                res.json(responseData);
                return;
            }else{
                new Category({
                    name:name
                }).save().then(function (newCategory) {
                    if(newCategory){
                        responseData.message = "添加成功"
                        res.json(responseData);
                    }
                });
            }
        });
    }

});

module.exports=router;