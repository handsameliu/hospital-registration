'use strict';

let {db} = require('../db');
let {message} = require('../helper');
let userService = db.User;

/**
 * 系统用户登陆
 */
exports.signIn = (req, res) => {
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
 * 新增系统用户
 */
exports.signUp = (req, res) => {
    let body = req.body;
    if (!body || !(body.username && body.password)) {
        res.json(message('params invalid'));
        return;
    }
    userService.findOne({username:body.username}).exec((err,data) => {
        if(err){
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('user repeat'));
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
 * 系统用户退出
 */
exports.signOut = (req, res) => {
    req.session.user = null;  
    res.json(message(null,{message:'success'}));
};

/**
 * 系统用户搜索
 */
exports.searchUser = (req, res) => {
    let body = req.body;
    console.log('user',body);
    userService.find({username: {$regex: body.username, $options: '$i'}, department: body.department, title: body.title}, {password: 0}).populate('department', "_id name").populate('title', "_id name").exec((err,data) => {
        if(err){
            return message(err);
        }
        res.json(message(null, {error_code:0,message:'success',result:data}));
    });
};
/**
 * 修改系统用户状态信息
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUser = (req, res) => {
    let body = req.body;
    if(!body && !(req.body || body.department || body.title || body.status)){
        return res.json(message('parmas invalid'));
    }
    console.log(body);
    userService.findByIdAndUpdate(body._id, {$set: {department: body.department, title: body.title, status: body.status}}, {new: true}).exec((err, data) => {
        if(err){
            return message(err);
        }
        res.json(message(null, {error_code: 0, message: 'success', result: data}));
    });
};