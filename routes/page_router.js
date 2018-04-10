'use strict';

const express = require('express');
const router = express.Router();

const pageController = require("../controller/pageController.js");

console.log('page  page  page')
router.get('/',pageController.signIn); /*登录*/
router.get('/index',pageController.index); /*首页*/

module.exports = router;
