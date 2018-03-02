'use strict';

const mongoose = require('mongoose');
let settings = require('../settings');

module.exports = ()=>{
	mongoose.Promise = Promise;
	const Schema = mongoose.Schema;
	let ObjectId = mongoose.Schema.Types.ObjectId;
	let db = mongoose.connect(settings.dbUrl);

	// db.on('error',console.error.bind(console,'连接错误:'));
	// db.once('open',console.error.bind(console,'打开连接:'));

	// 系统用户表
	let userSchema = new mongoose.Schema({
		username:{type:String,required: true},						/*用户名*/
		password:{type:String,required: true},						/*密码*/
		department:{type:ObjectId,required:true,ref:"Department"}, 	/*所在科室,关联科室表*/
		title:{type:ObjectId,required:true,ref:"Title"}, 			/*医师职称 关联职称表*/
		status:{type:Number,required:true,default:0},				/*状态  -1封禁，0正常，999超级管理员*/
		createTime:{type:Date,default: Date.now},					/*创建时间*/
		updateTime:{type:Date,default: Date.now}					/*修改时间*/
	});

	// 科室表
	let departmentSchema = new mongoose.Schema({
		name:{type:String,required:true},				/*科室名称*/
		address:{type:String,required:true},			/*科室地址*/
		desc:{type:String,required:false},				/*备注*/
		createTime:{type:Date,default: Date.now},		/*创建时间*/
		updateTime:{type:Date,default: Date.now}		/*修改时间*/
	});

	// 职称表
	let titleSchema = new mongoose.Schema({
		name:{type:String,required:true},				/*职称名称*/
		desc:{type:String,required:false},				/*备注*/
		createTime:{type:Date,default: Date.now},		/*创建时间*/
		updateTime:{type:Date,default: Date.now}		/*修改时间*/
	});

	// 系统模块表
	let moduleSchema = new mongoose.Schema({
		name:{type:String,required:true},				/*模块名称*/
		status:{type:Number,required:true},				/*状态 0 正常，1 屏蔽*/
		desc:{type:String,required:false},				/*备注*/
		createTime:{type:Date,default: Date.now},		/*创建时间*/
		updateTime:{type:Date,default: Date.now}		/*修改时间*/
	});

	// 权限表
	let jurisdictionSchema = new mongoose.Schema({
		title:{type:ObjectId,required:true,ref:"Title"},//职称id 关联职称表
		module:{type:Array,required:true},				//模块id数组
		desc:{type:String,required:false},				/*备注*/
		createTime:{type:Date,default: Date.now},		/*创建时间*/
		updateTime:{type:Date,default: Date.now}		/*修改时间*/
	});

	// 患者档案表
	let patientSchema = new mongoose.Schema({
		// 初次挂号时创建，其他情况下直接复制其信息至挂号表
		name:{type:String,required:true},				/*患者名称*/
		cardId:{type:String,required:true},				/*患者身份证号 */
		socialSecurityId:{type:String,required:true},	/*患者社保卡号 有就是医保报销，无就是自费 */
		address:{type:String,required:true},			/*患者联系地址*/
		mobile:{type:String,required:true},				/*患者联系方式*/
		userId:{type:String,required:true,ref:"User"},	/*创建者ID 关联系统用户表*/
		desc:{type:String,required:false},				/*备注*/
		createTime:{type:Date,default: Date.now},		/*创建时间*/
		updateTime:{type:Date,default: Date.now}		/*修改时间*/
	});

	// 挂号表
	let registerSchema = new mongoose.Schema({
		// 设计失误，应当是患者档案表是唯一的，但挂号表中包含患者挂号当时患者档案中存在的信息
		// 给当前表添加患者档案表一样的字段
		name:{type:String,required:true},							/*患者名称*/
		cardId:{type:String,required:true},							/*患者身份证号 */
		socialSecurityId:{type:String,required:true},				/*患者社保卡号 有就是医保报销，无就是自费 */
		address:{type:String,required:true},						/*患者联系地址*/
		mobile:{type:String,required:true},							/*患者联系方式*/
		userId:{type:String,required:true,ref:"User"},				/*创建者ID 关联系统用户表*/
		//-------
		patientId:{type:String,required:true,ref:" Patient"},		/*关联患者id*/
		departmentId:{type:String,required:true,ref:"Department"},  /*关联科室表id */
		doctorId:{type:String,required:true,ref:"User"},			/*主治医师id */
		visitDate:{type:Date,required:true},						/*就诊日期*/
		visitDateStage:{type:Number,required:true},					/*就诊阶段，0 上午 ，1 下午*/
		type:{type:Number,required:true,default:0},					/*当前就诊阶段  0刚挂号未分诊，1已分诊等待就诊，2就诊中，3挂起，4就诊完毕*/
		test:{type:Array,required:false},							/*体检项 {id:体检项id,name:体检项名称,department:所在科室id,desc:描述}*/
		medicine:{type:Array,required:false},						/*药物 {id:药物id,name:药物名称,desc:描述}*/
		symptom:{type:String,required:false},						/*症状 */
		testResults:{type:Array,required:false},					/*体检结果 {id:体检项id,result:体检结果}*/
		price:{type:Number,required:true},							/*挂号价格 不同医生职称不同价格*/
		desc:{type:String,required:false},							/*备注*/
		createTime:{type:Date,default: Date.now},					/*创建时间*/
		updateTime:{type:Date,default: Date.now}					/*修改时间*/
	});

	// 体检项表
	let testSchema = new mongoose.Schema({
		name:{type:String,required:true},				/*体检项名称 */
		departmentId:{type:ObjectId,required:true,ref:"Department"},/*所在科室id*/
		price:{type:Number,required:true},				/*价格*/
		status:{type:Number,required:false},			/*状态 0 正常，1停止检查*/
		desc:{type:String,required:false},				/*备注 描述*/
		createTime:{type:Date,default: Date.now},		/*创建时间*/
		updateTime:{type:Date,default: Date.now}		/*修改时间*/
	});

	// 药表
	let medicineSchema = new mongoose.Schema({
		name:{type:String,required:true},				/*药物名称*/
		isOTC:{type:Boolean,required:true},				/*处方药 是否是OTC类药物 true可随意购买，false需医师指导购买*/
		price:{type:Number,required:false},				/*处方药价格*/
		status:{type:Number,required:true},				/*状态： 0 正常售卖，1 下架，2 缺货， 3 补货中，4 限制售卖*/
		desc:{type:String,required:false},				/*药物描述*/
		createTime:{type:Date,default: Date.now},		/*创建时间*/
		updateTime:{type:Date,default: Date.now}		/*修改时间*/
	});
	
	let models = {};
	models.User = mongoose.model('User',userSchema,'user');
	models.Department = mongoose.model('Department',departmentSchema,'department');
	models.Title = mongoose.model('Title',titleSchema,'title');
	models.Module = mongoose.model('Module',moduleSchema,'module');
	models.Jurisdiction = mongoose.model('Jurisdiction',jurisdictionSchema,'jurisdiction');
	models.Patient = mongoose.model('Patient',patientSchema,'patient');
	models.Register = mongoose.model('Register',registerSchema,'register');
	models.Test = mongoose.model('Test',testSchema,'test');
	models.Medicine = mongoose.model('Medicine',medicineSchema,'medicine');

	models.mongoose = mongoose;
	models.conn = mongoose.connection;
	
	return models;
}

