'use strict';

let {db} = require('../db');
let {message} = require('../helper');
let titleService = db.Title;

/**
 * 新增职位
 * @param {name 职位名称，price 价格，desc 职位备注} req 
 * @param {*} res 
 */
exports.addTitle = (req, res) => {
    let body = req.body;
    if(!body || !(body.name && body.price)){
        return res.json(message('params invalid'));
    }
    titleService.findOne({name: body.name}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('title repeat'));
        }
        titleService.create(body, (error, data) => {
            console.log(error);
            if(error){
                return res.json(message('addTitle error', error));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        })
    });
}
/**
 * 修改模块信息
 * @param {_id 被修改的职位id，name 职位名称，price 价格，desc 职位备注} req 
 * @param {*} res 
 */
exports.editTitle = (req, res) => {
    let id = req.body._id;
    titleService.findOne({name: req.body.name}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data && (data._id != id)) {
            return res.json(message('title repeat'));
        }
        titleService.findByIdAndUpdate(id, {$set:{name: req.body.name, desc: req.body.desc, price: req.body.price}}, {new: true}).exec((err, data) => {
            if (err) {
                return res.json(message(err));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
        })
    })
}
/**
 * 删除职位id
 * @param {_id 要删除的职位id} req 
 * @param {*} res 
 */
exports.delTitle = (req, res) => {
    let id = req.body._id;
    titleService.remove({_id: id}, (err) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}
/**
 * 根据职位id查询职位信息
 * @param {_id 要查询的职位id} req 
 * @param {*} res 
 */
exports.getTitleById = (req, res) => {
    console.log(req.params.titleId)
    titleService.findById(req.params.titleId).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
/**
 * 通过查询条件查询列表
 * @param {name 职位名称，price 价格，desc 职位备注} req 
 * @param {*} res 
 */
exports.getTitleList = (req, res) => {
    let queryObj = {}
    if (req.query.name) {
        queryObj.name = {$regex: req.query.name, $options: '$i'}
    }
    if (req.query.desc){
        queryObj.desc = {$regex: req.query.desc, $options: '$i'}
    }
    titleService.find(queryObj).exec((err ,data) => {
        // $options: '$i' 忽略大小写选项
        if(err){
            return res.json(message(err));
        }
        res.json(message(null,{error_code:0,message:'SUCCESS',result:data}));
    });
}