'use strict';

const express = require('express');
const router = express.Router();

const userController = require("../controller/userController");
const departmentController = require("../controller/departmentController");
// const titleController = require("../controller/titleController");
// const articleController = require("../controller/articleController");
// const jurisdictionController = require("../controller/jurisdictionController");
// const medicineController = require("../controller/medicineController");
// const moduleController = require("../controller/moduleController");
// const patientController = require("../controller/patientController");
// const registerController = require("../controller/registerController");
// const testController = require("../controller/testController");

/**
 * 系统用户表
 */
router.post('/signIn', userController.signIn);									        /*登陆*/
router.post('/signOut', userController.signOut);                                        /*退出*/
router.post('/signUp', userController.signUp);                                          /*注册新用户*/
router.post('/searchUser', userController.searchUser);                                  /*搜索系统用户*/
router.post('/updateUser', userController.updateUser);                                  /*修改系统用户信息*/

/**
 * 科室表
 */
router.post('/addDepartment',departmentController.addDepartment);                       // 新增
router.post('/editDepartment',departmentController.editDepartment);                     // 修改
router.post('/delDepartment',departmentController.delDepartment);                       // 删除
router.get('/getDepartmentById/:departmentId',departmentController.getDepartmentById);  // 通过id获取对应信息
router.get('/getDepartmentList',departmentController.getDepartmentList);                // 获取列表信息

/**
 * 职称表
 */
// router.post('/addTitle',titleController.addTitle);                                      // 新增
// router.post('/editTitle',titleController.editTitle);                                    // 修改
// router.post('/delTitle',titleController.delTitle);                                      // 删除
// router.get('/getTitleById/:titleId',titleController.getTitleById);                      // 通过id获取对应信息
// router.get('/getTitleList',titleController.getTitleList);                               // 获取列表信息

// /**
//  * 系统模块表
//  */
// router.post('/addModule',moduleController.addModule);                                   // 新增
// router.post('/editModule',moduleController.editModule);                                 // 修改
// router.post('/delModule',moduleController.delModule);                                   // 删除
// router.get('/getModuleById/:moduleId',moduleController.getModuleById);                  // 通过id获取对应信息
// router.get('/getModuleList',moduleController.getModuleList);                            // 获取列表信息

// /**
//  * 权限表
//  */
// router.post('/addJurisdiction',jurisdictionController.addJurisdiction);                       // 新增
// router.post('/editJurisdiction',jurisdictionController.editJurisdiction);                     // 修改
// router.post('/delJurisdiction',jurisdictionController.delJurisdiction);                       // 删除
// router.get('/getJurisdictionById/:jurisdictionId',jurisdictionController.getJurisdictionById);  // 通过id获取对应信息
// router.get('/getJurisdictionList',jurisdictionController.getJurisdictionList);                // 获取列表信息

// /**
//  * 患者档案表
//  */
// router.post('/addPatient',patientController.addPatient);                                // 新增
// router.post('/editPatient',patientController.editPatient);                              // 修改
// router.get('/getPatientById/:patientId',patientController.getPatientById);           // 通过id获取对应信息
// router.get('/getPatientList',patientController.getPatientList);                         // 获取列表信息

// /**
//  * 挂号表
//  */
// router.post('/addRegister',registerController.addRegister);                             // 新增
// router.post('/editRegister',registerController.editRegister);                           // 修改
// router.get('/getRegisterById/:registerId',registerController.getRegisterById);          // 通过id获取对应信息
// router.get('/getRegisterList',registerController.getRegisterList);                      // 获取列表信息

// /**
//  * 体检项表
//  */
// router.post('/addTest',testController.addTest);                                         // 新增
// router.post('/editTest',testController.editTest);                                       // 修改
// router.post('/delTest',testController.delTest);                                         // 删除
// router.get('/getTestById/:testId',testController.getTestById);                          // 通过id获取对应信息
// router.get('/getTestList',testController.getTestList);                                  // 获取列表信息

// /**
//  * 药表
//  */
// router.post('/addMedicine',medicineController.addMedicine);                             // 新增
// router.post('/editMedicine',medicineController.editMedicine);                           // 修改
// router.post('/delMedicine',medicineController.delMedicine);                             // 删除
// router.get('/getMedicineById/:medicineId',medicineController.getMedicineById);          // 通过id获取对应信息
// router.get('/getMedicineList',medicineController.getMedicineList);                      // 获取列表信息


module.exports = router;
