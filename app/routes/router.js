/**
 * Create by hauk0101 on 2017/8/3
 * @Desc 路由处理中心
 */

var express = require('express');
var router = express.Router();

var upload = require('../controllers/upload');
var encrypt = require('../controllers/encrypt');

//将默认根目录永久重定向为index路由
router.get('/', function (req, res, next) {
    res.redirect(301, '/index');
});
//主页
router.get('/index', function (req, res) {
    res.render('index',{data:null});
});
//上传视频页面
router.get('/upload', function (req, res) {
    res.render('upload');
});
//加密视频页面
router.get('/encrypt', function (req, res) {
    res.render('encrypt');
});
//权限登录页面
router.get('/login', function (req, res) {
    res.render('login');
});
//视频播放页面
router.get('/player', function (req, res) {
    res.render('player');
});
//视频加密POST请求处理
router.post('/encrypt',function (req,res) {
    console.log(req.body);
    encrypt(req.body,function(err,data){
        console.log(err,data);
        res.json(err,data);
    });
    //TODO 检查对应的文件夹是否存在，如果存在则开始执行ffmpeg加密操作，执行完后跳转至对应的index界面并返回参数

});
//上传视频POST请求处理
router.post('/upload-video', function (req, res) {
    var _upload = upload.single('file');
    _upload(req, res, function (err) {
        if (err) {
            console.log('上传失败！');
        }
        else {
            res.render('index', {
                data: {
                    type:1,
                    noencryptPath: req.file.destination,
                    fileName: req.file.originalname,
                    encryptPath: './public/videos/encrypt'
                }
            });
        }
        console.log(req.file);
    });
});
module.exports = router;