var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
var Archive = require('../models/archive');

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
 * 用户名称模糊查询
 */
router.get('/user/find',function(req,res){
    /**
     *读取用户表
     */
    var username = req.query.username;
    User.count().then(function (count) {
        User.find({username:{$regex:username}}).then(function (users) {
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
 * 添加分类页面跳转
 */
router.get('/category/add',function (req,res) {
    res.render('admin/addCategory',{
        userInfo:req.userInfo
    })
});

/**
 * 添加分类post方法
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

/**
 * 删除分类
 */
router.get('/category/delete',function (req,res) {
    var _id = req.query._id;

    Category.findByIdAndRemove(_id).then(function (category) {
        if(category){
            responseData.message="删除成功";
            res.json(responseData);
        }else{
            responseData.code=2;
            responseData.message="删除失败";
            res.json(responseData);
        }
    });
});

/**
 * 分类详情页面跳转
 */
router.get('/category/detail',function (req,res) {
    var _id = req.query._id;
    console.log(_id);
    Category.findById(_id).then(function (category) {
        if(category){
            res.render('admin/detailCategory',{
                userInfo:req.userInfo,
                category:category
            })
        }
    });
});

/**
 * 修改分类页面跳转
 */
router.get('/category/edit',function (req,res) {
    var _id = req.query._id;
    console.log(_id);
    Category.findById(_id).then(function (category) {
        if(category){
            res.render('admin/editCategory',{
                userInfo:req.userInfo,
                category:category
            })
        }
    });
});

/**
 * 修改分类post方法
 */
router.post('/category/edit',function (req,res) {
    var _id = req.body._id;
    var name = req.body.name;
    console.log(_id);
    Category.findById(_id).then(function (category) {
        if(category){
            res.render('admin/editCategory',{
                userInfo:req.userInfo,
                category:category
            })
        }
    });
});


/**
 * 分类名称模糊查询
 */
router.get('/category/find',function(req,res){
    /**
     *读取分类表
     */
    var name = req.query.name;
    Category.count().then(function (count) {
        Category.find({name:{$regex:name}}).then(function (categories) {
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
 * 文章管理
 */
router.get('/archive',function (req,res) {
    /**
     *读取文章表
     * 首次默认limit为10，这个跟前端的页面的分页控件的默认limit保持一致
     */
    var page = req.query.page||1;
    var limit =Number(req.query.limit)||10;
    var skip = (page-1)*limit;
    Archive.count().then(function (count) {
        Archive.find().skip(skip).limit(limit).populate('category').then(function (archives) {
            console.log(archives);
            res.render('admin/archive',{
                userInfo:req.userInfo,
                archives:archives,
                count:count
            })
        });
    });
});

router.get('/archive/add',function (req,res) {
    /**
     *读取用户表
     */
    Category.find().then(function (categories) {
        res.render('admin/addArchive',{
            userInfo:req.userInfo,
            categories:categories
        })
    });
});

/**
 * 添加文章
 */
router.post('/archive/add',function (req,res) {
    var reqBody = req.body;
    var title = reqBody.title;
    var content = reqBody.content;
    var description = reqBody.description;
    var category = reqBody.category;
    new Archive({
        title:title,
        content:content,
        description:description,
        category:category
    }).save().then(function (newArchive) {
        if(newArchive){
            responseData.message = "添加成功"
            res.json(responseData);
        }
    });
});

module.exports=router;