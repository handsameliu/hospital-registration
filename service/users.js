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
    userService.findOne({username:body.username,password:body.password,status:0}).exec((err,data) => {
        if(err){
            return res.json(message(err));
        }
        if (!data) {
            return res.json(message('username && password invalid'));
        }
        req.session.user = {username: data.username,_id: data._id,title: data.title};
        res.json(message(null,{error_code:0,message:'SUCCESS',result:{username: data.username, _id: data._id, title: data.title}}));
    });
};

/**
 * 新增系统用户
 */
exports.signUp = (req, res) => {
    let body = req.body;
    if (!body || !(body.username && body.department && body.title)) {
        res.json(message('params invalid'));
        return;
    }
    body.status = 0
    body.password = '123456'
    userService.findOne({username: body.username, department: body.department, title: body.title}).exec((err,data) => {
        if(err){
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('user repeat'));
        }
        userService.create(body,(err,data) => {
            if(err){
                return res.json(message('signUp error',err));
            }
            res.json(message(null,{error_code:0,message:'SUCCESS'}));
        });
    });
};

/**
 * 系统用户退出
 */
exports.signOut = (req, res) => {
    req.session.user = null;  
    res.json(message(null,{message:'SUCCESS'}));
};

/**
 * 系统用户搜索
 */
exports.searchUser = (req, res) => {
    let body = req.query;
    let queryObj = {}
    if (body.username) {
        queryObj.username = {$regex: body.username, $options: '$i'}
    }
    if (body.department) {
        queryObj.department = body.department
    }
    if (body.title) {
        queryObj.title = body.title
    }
    if (!isNaN(body.status)) {
        queryObj.status = body.status
    }
    userService.find(queryObj, {password: 0}).limit(body.pageSize * 1).skip((body.pageNumber-1) * 1 * body.pageSize).populate('department', "_id name").populate('title', "_id name price").exec((err,data) => {
        if(err){
            return res.json(message(err));
        }
        userService.count(queryObj).exec((err, pageCount) => {
            if (err) {
                return res.json(message(err));
            }
            res.json(message(null, {error_code:0,message:'SUCCESS',result: {data, pageCount}}));
        })
    });
};
/**
 * 修改系统用户状态信息
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUser = (req, res) => {
    let body = req.body;
    if (!body && !(body.department && body.title && !isNaN(body.status))) {
        return res.json(message('parmas invalid'));
    }
    userService.find({username:body.username, department: body.department, title: body.title, status: body.status}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data && data.length > 0) {
            return res.json(message('infomation repeat'));
        }
        userService.findByIdAndUpdate(body._id, {$set: {department: body.department, title: body.title, status: body.status}}, {select:'department status title username _id', new: true}).populate('department', "_id name").populate('title', "_id name price").exec((err, data) => {
            if(err){
                return res.json(message(err));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
        });
    })
};