"use strict";

let {db} = require('../db');
let {message, simpleDateFormat} = require('../helper');
let registerService = db.Register;

/**
 * 新增挂号
 * @param {*} req 
 * @param {*} res 
 */
exports.addRegister = (req, res) => {
    let body = req.body;
    if (!body || !(body.patient.userId && body.register.patientId && body.register.departmentId && body.register.doctorId && body.register.visitDate && !isNaN(body.register.type))) {
        return res.json(message('params invalid'));
    }
    registerService.create({...body.patient,...body.register}, (error, data) => {
        if (error) {
            console.log(error);
            return res.json(message('addRegister error', error));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
    });
}

/**
 * 修改挂号信息
 * @param {type 当前状态,test 体检项,medicine 药物,symptom 症状,testResults体检结果,desc 备注 } req 
 * @param {*} res 
 */
exports.editRegister = (req, res) => {
    let body = req.body;
    //  {type: body.type, test: body.test, medicine: body.medicine, symptom: body.symptom, testResults : body.testResults, desc: body.desc}
    registerService.findByIdAndUpdate(req.body._id, {$set: body}, {new: true}).exec((error, data) => {
        if(error){
            return res.json(message(error));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    });
}

/**
 * 通过id获取挂号信息
 * @param {*} req 
 * @param {*} res 
 */
exports.getRegisterById = (req, res) => {
    console.log(req.params.registerId)
    registerService.findById(req.params.registerId)
    .populate({path: 'departmentId', select: "_id name address desc"})
    .populate({path: 'userId', select: "_id username department title", populate: [{ path: 'department', select: '_id name address desc'}, { path: 'title', select: '_id name desc'}]})
    .populate({path: 'doctorId', select: "_id username department title", populate: [{ path: 'department', select: '_id name address desc'}, { path: 'title', select: '_id name desc'}]})
    // 无法使用populate方法，待查
    .populate({path: 'test', select: ['_id', 'name', 'departmentId', 'price', 'desc'], populate: {path: 'departmentId', select: '_id name address desc'}})
    .populate({path: 'medicine', select: "_id name isOTC price desc"})
    .exec((err, data) => {
        if (err) {
            return res.json(message(err));
        }
        res.json(message(null, {error_code: 0, message: 'SUCCESS', result: data}));
    })
}

/**
 * 获取挂号信息列表
 * @param {name 用户名, cardId 身份证号, socialSecurityId 社保号, mobile 手机号, userId 创建者, departmentId 科室id, doctorId 接诊医生id, visitDate 就诊时间, visitDateStage 具体就诊时间 上午or下午, type 挂号状态, test 体检项} req 
 * @param {*} res 
 */
exports.getRegisterList = (req, res) => {
    console.log(req.query);
    let query = req.query,
        queryObj = {};
    console.log('query', query)
    if(query.name){
        queryObj.name = {$regex: req.query.name, $options: '$i'};
    }
    if(query.cardId){
        queryObj.cardId = query.cardId;
    }
    if(query.socialSecurityId){
        queryObj.socialSecurityId = query.socialSecurityId;
    }
    if(query.mobile){
        queryObj.mobile = req.query.mobile;
    }
    if(query.userId){
        queryObj.userId = query.userId;
    }
    if(query.department){
        queryObj.departmentId = query.department;
    }
    if(query.doctorId){
        queryObj.doctorId = query.doctorId;
    }
    if(!query.visitDateStart){
        query.visitDateStart = simpleDateFormat(new Date(), 'yyyy-MM-dd')
    }
    if(!query.visitDateOver){
        query.visitDateOver = simpleDateFormat(new Date(), 'yyyy-MM-dd')
    }
    queryObj.visitDate = {$gte: query.visitDateStart, $lte: query.visitDateOver}
    if(query.visitDateStage && query.visitDateStage!=='999'){
        queryObj.visitDateStage = query.visitDateStage;
    }
    if(!isNaN(query.type)){
        queryObj.type = query.type;
    }
    if(query.test){
        queryObj.test = {$in: [query.test]};    //{$elemMatch: {_id: query.test}}; 
    }
    console.log('queryObj', queryObj)
    registerService.find(queryObj)
    .populate({path: 'departmentId', select: "_id name address desc"})
    .populate({path: 'userId', select: "_id username department title", populate: [{ path: 'department', select: '_id name address desc'}, { path: 'title', select: '_id name desc'}]})
    .populate({path: 'doctorId', select: "_id username department title", populate: [{ path: 'department', select: '_id name address desc'}, { path: 'title', select: '_id name desc'}]})
    .populate({path: 'test', select: ['_id', 'name', 'departmentId', 'price', 'desc'], populate: {path: 'departmentId', select: '_id name address desc'}})
    .populate({path: 'medicine', select: "_id name isOTC price desc"})
    .exec((error ,data) => {
        // $options: '$i' 忽略大小写选项
        if(error){
            console.log(error);
            return res.json(message(error));
        }
        registerService.count(queryObj).exec((err, pageCount) => {
            if(err){
                return res.json(message(err));
            }
            res.json(message(null,{error_code: 0,message: 'SUCCESS',result: {data, pageCount}}));
        })
        // let returnData = data;
        // if(query.test){
        //     returnData = data.filter((item) => {
        //         for (let i=0;i<item.test.length;i++) {
        //             if (item.test[i]._id === query.test) {
        //                 return true;
        //             }
        //         }
        //     })
        // }
    });
}