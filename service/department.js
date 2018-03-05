'use strict';

let {db} = require('../db');
let {message} = require('../helper');
let departmentService = db.Department;

/**
 * 新增科室
 * @param {name 科室名称，address 科室地址，desc 科室备注} req 
 * @param {*} res 
 */
exports.addDepartment = (req, res) => {
    let body = req.body;
    if(!body || !(body.name && body.address)){
        return res.json(message('params invalid'));
    }
    departmentService.findOne({name: body.name, address: body.address, desc: body.desc}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        if (data) {
            return res.json(message('department repeat'));
        }
        departmentService.create(body, (error, data) => {
            console.log(error);
            if(error){
                return res.json(message('addDepartment error', error));
            }
            res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        })
    });
}
/**
 * 
 * @param {_id 被修改的科室id，name 科室名称，address 科室地址，desc 科室备注} req 
 * @param {*} res 
 */
exports.editDepartment = (req, res) => {
    let id = req.body._id;
    departmentService.findByIdAndUpdate(req.body._id,{$set:{name: req.body.name,address: req.body.address,desc: req.body.desc}}).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}
/**
 * 删除科室id
 * @param {_id 要删除的科室id} req 
 * @param {*} res 
 */
exports.delDepartment = (req, res) => {
    let id = req.body._id;
    departmentService.remove({_id: id}, (err) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    })
}
/**
 * 根据科室id查询科室信息
 * @param {_id 要查询的科室id} req 
 * @param {*} res 
 */
exports.getDepartmentById = (req, res) => {
    console.log(req.params.departmentId)
    departmentService.findById(req.params.departmentId).exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}
/**
 * 通过查询条件查询列表
 * @param {name 科室名称，address 科室地址，desc 科室备注} req 
 * @param {*} res 
 */
exports.getDepartmentList = (req, res) => {
    console.log(req.query)
    // 以下两个方法都可以查询到对应信息，查询条件必须都要有，否则视为空，会查询到所有
    // departmentService.find({$or: [{name: new RegExp(req.query.name, 'g')}, {address: new RegExp(req.query.address, 'g')}, {desc: new RegExp(req.query.desc, 'g')}]}).exec((err ,data) => {
    // 使用and并排查询即可，$or会把所有符合条件的都查询出来（如果条件为空，那极有可能会查询出所有）
    departmentService.find({name: {$regex: req.query.name, $options: '$i'}, address: {$regex: req.query.address, $options: '$i'}, desc: {$regex: req.query.desc, $options: '$i'}}).exec((err ,data) => {
        // $options: '$i' 忽略大小写选项
        if(err){
            return res.json(message(err));
        }
        res.json(message(null,{error_code:0,message:'success',result:data}));
    });
}