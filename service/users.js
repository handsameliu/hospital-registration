'use strict';

let {db} = require('../db');
let {message} = require('../helper');
let userService = db.User;
let articleService = db.Article;
let commentService = db.Comment;

/**
 * 登陆
 */
exports.signIn = (req,res) => {
    let body = req.body;
    if (!body || !(body.username && body.password)) {
        res.json(message('params invalid'));
        return;
    }
    userService.findOne({username:body.username,password:body.password,isStatus:0}).exec((err,data) => {
        console.log('--',err);
        if(err){
            return res.json(message(err));
        }
        console.log('--',data);
        if (!data) {
            return res.json(message('username && password invalid'));
        }
        req.session.user = {username:data.username,_id:data._id};
        res.json(message(null,{error_code:0,message:'success',result:{username:data.username,_id:data._id}}));
    });
};

/**
 * 注册
 */
exports.signUp = (req,res) => {
    let body = req.body;
    if (!body || !(body.username && body.password && body.email)) {
        res.json(message('params invalid'));
        return;
    }
    userService.findOne({email:body.email}).exec((err,data) => {
        if(err){
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('email repeat'));
        }
        userService.create(body,(err,data) => {
            console.log(err);
            if(err){
                return res.json(message('signUp error',err));
            }
            res.json(message(null,{error_code:0,message:'success'}));
        });
    });
};

/**
 * 退出
 */
exports.signOut = (req,res) => {
    req.session.user = null;  
    res.json(message(null,{message:'success'}));
};

/**
 * 搜索
 */
exports.searchUser = (req,res) => {
    let val = req.body.val;
    console.log('user',val);
    userService.find({$or:[{username:new RegExp(val,'g')},{email:new RegExp(val,'g')}]}).exec((err,data) => {
        if(err){
            return message('params invalid');
        }
        res.json(message(null,{error_code:0,message:'success',result:data}));
    });
};

exports.updateUser = (req,res) => {
    let _id = req.body._id;
    let val = req.body.val;  
    userService.findByIdAndUpdate(_id,{$set:{isStatus:val}}).exec((err,data) => {
        if(err){
            return message('params invalid');
        }
        res.json(message(null,{error_code:0,message:'success',result:data}));
    });
};