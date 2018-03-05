'use strict';

let {db} = require('../db');
let {message} = require('../helper');
let moduleService = db.Modular;

/**
 * 新增模块
 * @param {name 模块名称，address 模块地址，desc 模块备注} req 
 * @param {*} res 
 */
exports.addModule = (req, res) => {
    let body = req.body;
    if(!body || !(body.name || body.status)){
        return res.json(message('params invalid'));
    }
    moduleService.findOne({name: body.name, status: body.status, desc: body.desc}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('module repeat'));
        }
        moduleService.create(body, (error, data) => {
            console.log(error);
            if(error){
                return res.json(message('addModule error', error));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        })
    });
}
/**
 * 修改模块信息
 * @param {_id 被修改的模块id，name 模块名称，address 模块地址，desc 模块备注} req 
 * @param {*} res 
 */
exports.editModule = (req, res) => {
    let id = req.body._id;
    moduleService.findByIdAndUpdate(req.body._id,{$set:{name: req.body.name, status: req.body.status, desc: req.body.desc}}, {new: true}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
/**
 * 删除模块id
 * @param {_id 要删除的模块id} req 
 * @param {*} res 
 */
exports.delModule = (req, res) => {
    moduleService.remove({_id: req.body._id}, (err) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}
/**
 * 根据模块id查询模块信息
 * @param {_id 要查询的模块id} req 
 * @param {*} res 
 */
exports.getModuleById = (req, res) => {
    console.log(req.params)
    moduleService.findById(req.params.moduleId).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
/**
 * 通过查询条件查询列表
 * @param {name 模块名称，address 模块地址，desc 模块备注} req 
 * @param {*} res 
 */
exports.getModuleList = (req, res) => {
    let whereObj = {};
    whereObj.name = {$regex: req.query.name, $options: '$i'};
    if(!isNaN(req.query.status) && req.query.status!=''){
        whereObj.status = req.query.status;
    }
    whereObj.desc = {$regex: req.query.desc, $options: '$i'};
    moduleService.find( whereObj ).exec((err ,data) => {
        // $options: '$i' 忽略大小写选项
        if(err){
            console.error(err);
            return res.json(message(err));
        }
        res.json(message(null,{error_code:0,message:'success',result:data}));
    });
}