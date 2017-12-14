'use strict';

const express = require('express');
const router = express.Router();

const pageController = require("../controller/pageController.js");

router.get('/',pageController.signIn); /*首页*/
router.get('/index',pageController.index); /*首页*/
router.get('/signIn',pageController.signIn); /*登陆*/
router.get('/signUp',pageController.signUp); /*注册*/
router.get('/article/:id',pageController.articleById); /*查看帖子详情*/
router.get('/subject',pageController.subject); /*话题*/
router.get('/write',pageController.write); /*写入*/

router.get('/admin',pageController.adminFindAll); /*后台查询所有*/

module.exports = router;
