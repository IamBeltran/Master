	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const express	= require('express');
	const router	= express.Router();

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MY-MODULE DEPENDENCIES.													│
//	└───────────────────────────────────────────────────────────────────────────────────┘ 

//	──[	CONTROLLER TASK ]────────────────────────────────────────────────────────────────
	const { signInController } = require('../controllers/');

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	HANDLER OF ROUTES.																│
//	└───────────────────────────────────────────────────────────────────────────────────┘


//	METHOD POST| PATH http://HOST:PORT/api/tasks
	router.post('/', signInController.signIn);


//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = router;