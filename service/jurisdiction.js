'use strict';

let {db} = require('../db');
let {message} = require('../helper');
let jurisdictionService = db.Jurisdiction;

/**
 * 新增权限
 * @param {name 权限名称，address 权限地址，desc 权限备注} req 
 * @param {*} res 
 */
exports.addJurisdiction = (req, res) => {
    let body = req.body;
    if(!body || !(body.title && body.module)){
        return res.json(message('params invalid'));
    }
    jurisdictionService.findOne({title: body.title, module: body.module, desc: body.desc}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('jurisdiction repeat'));
        }
        jurisdictionService.create(body, (error, data) => {
            console.log(error);
            if(error){
                return res.json(message('addJurisdiction error', error));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        })
    });
}
/**
 * 修改权限信息
 * @param {_id 被修改的权限id，name 权限名称，address 权限地址，desc 权限备注} req 
 * @param {*} res 
 */
exports.editJurisdiction = (req, res) => {
    let id = req.body._id;
    jurisdictionService.findByIdAndUpdate(req.body._id,{$set: {title: req.body.title, module: req.body.module, desc: req.body.desc}}, {new: true}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
/**
 * 删除权限id
 * @param {_id 要删除的权限id} req 
 * @param {*} res 
 */
exports.delJurisdiction = (req, res) => {
    let id = req.body._id;
    jurisdictionService.remove({_id: id}, (err) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}
/**
 * 根据权限id查询权限信息
 * @param {_id 要查询的权限id} req 
 * @param {*} res 
 */
exports.getJurisdictionById = (req, res) => {
    console.log(req.params.jurisdictionId)
    jurisdictionService.findById(req.params.jurisdictionId).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
/**
 * 通过查询条件查询列表
 * @param {name 权限名称，address 权限地址，desc 权限备注} req 
 * @param {*} res 
 */
exports.getJurisdictionList = (req, res) => {
    console.log(req.query)
    let whereObj = {};
    if(req.query.title){
        whereObj.title = req.query.title;
    }
    if(req.query.desc){
        whereObj.desc = {$regex: req.query.desc, $options: '$i'};
    }
    jurisdictionService.find(whereObj).exec((err ,data) => {
        // $options: '$i' 忽略大小写选项
        console.log(data);
        if(err){
            console.error(err);
            return res.json(message(err));
        }
        let returnData = data;
        if(req.query.module){
            returnData = data.filter((item) => {
                for (let i=0;i<item.module.length;i++) {
                    if (item.module[i]._id === req.query.module) {
                        return true;
                    }
                }
            })
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: returnData}));
    });
}