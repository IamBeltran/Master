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
	const { taskController } = require('../controllers/');

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	HANDLER OF ROUTES.																│
//	└───────────────────────────────────────────────────────────────────────────────────┘

//	METHOD GET| PATH http://HOST:PORT/api/tasks
	router.get('/', taskController.getTasks);

//	METHOD GET| PATH http://HOST:PORT/api/tasks/:id
	router.get('/:id',taskController.getTask);

//	METHOD POST| PATH http://HOST:PORT/api/tasks
	router.post('/', taskController.addTask);

//	METHOD PUT| PATH http://HOST:PORT/api/tasks/:id
	router.put('/:id', taskController.updateTask);

//	METHOD DELETE| PATH http://HOST:PORT/api/tasks/:id
	router.delete('/:id', taskController.deleteTask);

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = router;