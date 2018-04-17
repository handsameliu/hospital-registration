"use strict";

let {db} = require('../db');
let {message, simpleDateFormat} = require('../helper');
let registerService = db.Register;
let userService = db.User;
let testService = db.Test;

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
    registerService.create({...body.patient, ...body.register, status: 0}, (error, data) => {
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
    let _id = body._id;
    delete body._id;
    registerService.findByIdAndUpdate(_id, {$set: body}, {new: true}).exec((error, data) => {
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
        queryObj = {},
        today = new Date();
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
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        query.visitDateStart = simpleDateFormat(today, 'yyyy-MM-dd HH:mm:ss')
    }
    if(!query.visitDateOver){
        query.visitDateOver = simpleDateFormat(new Date(today.getTime() + 1000*60*60*24), 'yyyy-MM-dd HH:mm:ss')
    } else {
        query.visitDateOver = simpleDateFormat(new Date(new Date(query.visitDateOver).getTime() + 1000*60*60*24), 'yyyy-MM-dd HH:mm:ss')
    }
    queryObj.visitDate = {$gte: query.visitDateStart, $lte: query.visitDateOver}
    if(!isNaN(query.visitDateStage) && query.visitDateStage!=='999'){
        queryObj.visitDateStage = query.visitDateStage * 1;
    }
    if(!isNaN(query.type)){
        queryObj.type = query.type;
    }
    if(query.test){
        queryObj.test = {$in: [query.test]};    //{$elemMatch: {_id: query.test}}; 
    }
    if (!isNaN(query.status) && query.status !== '999') {
        queryObj.status = query.status
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

exports.getRegisterByTestAndDoctor = (req, res) => {
    let body = req.body;
    let testIds = [],
        today = new Date();
    const queryObj = {};
    if (!body.doctorId) {
        return res.json(message('params invalid'))
    }
    userService.findOne({_id: body.doctorId}).populate('department', "_id name").exec((userError, userData) => {
        if (userError) {
            return res.json(message(userError))
        }
        if (userData) {
            testService.find({departmentId: userData.department._id}).exec((testError, testData) => {
                if (testError) {
                    return res.json(message(testError));
                }
                if (testData && testData.length > 0) {
                    testData.forEach((item, index) => {
                        testIds.push(item._id);
                    })
                    if (testIds && testIds.length > 0) {
                        queryObj.test = {$in: testIds};
                    }
                    if (!body.visitDateStart) {
                        today.setHours(0);
                        today.setMinutes(0);
                        today.setSeconds(0);
                        today.setMilliseconds(0);
                        body.visitDateStart = simpleDateFormat(today, 'yyyy-MM-dd');
                    }
                    if (!body.visitDateOver) {
                        body.visitDateOver = simpleDateFormat(new Date(today.getTime() + 1000*60*60*24), 'yyyy-MM-dd')
                    } else {
                        body.visitDateOver = simpleDateFormat(new Date(new Date(body.visitDateOver).getTime() + 1000*60*60*24), 'yyyy-MM-dd')
                    }
                    queryObj.visitDate = {$gte: body.visitDateStart, $lte: body.visitDateOver}
                    if (!isNaN(body.visitDateStage) && body.visitDateStage !== '999') {
                        queryObj.visitDateStage = body.visitDateStage * 1
                    }
                    if (body.name) {
                        queryObj.name = {$regex: body.name, $options: '$i'};
                    }
                    console.log(queryObj)
                    registerService.find(queryObj)
                    .populate({path: 'departmentId', select: "_id name address desc"})
                    .populate({path: 'userId', select: "_id username department title", populate: [{ path: 'department', select: '_id name address desc'}, { path: 'title', select: '_id name desc'}]})
                    .populate({path: 'doctorId', select: "_id username department title", populate: [{ path: 'department', select: '_id name address desc'}, { path: 'title', select: '_id name desc'}]})
                    .populate({path: 'test', select: ['_id', 'name', 'departmentId', 'price', 'desc'], populate: {path: 'departmentId', select: '_id name address desc'}})
                    .populate({path: 'medicine', select: "_id name isOTC price desc"})
                    .exec((registerError, registerData) => {
                        if (registerError) {
                            return res.json(message(registerError))
                        }
                        if (registerData && registerData.length > 0) {
                            registerService.count(queryObj).exec((err, pageCount) => {
                                if(err){
                                    return res.json(message(err));
                                }
                                res.json(message(null,{error_code: 0,message: 'SUCCESS',result: {data: registerData, pageCount, testData}}));
                            })
                        } else {
                            return res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
                        }
                    })
                } else {
                    return res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
                }
            })
        } else {
            return res.json(message(null, {error_code: 0, message: 'SUCCESS'}));
        }
    })
    
    
}