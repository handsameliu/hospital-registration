'use strict';

const express = require('express');
const router = express.Router();

const pageController = require("../controller/pageController.js");

router.get('/',pageController.signIn); /*首页*/
router.get('/index',pageController.index); /*首页*/

module.exports = router;
