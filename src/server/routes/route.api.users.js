	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const express	= require('express');
	const router	= express.Router();

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MY-MODULE DEPENDENCIES.													│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const Controllers		= require('../controllers/');

//	──[	CONTROLLER TASK ]────────────────────────────────────────────────────────────────
	const userController	= Controllers.user;

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	HANDLER OF ROUTES.																│
//	└───────────────────────────────────────────────────────────────────────────────────┘

//	METHOD GET| PATH http://HOST:PORT/api/users
	router.get('/', userController.getUsers);

//	METHOD GET| PATH http://HOST:PORT/api/users/:id
	router.get('/:id',userController.getUser);

//	METHOD POST| PATH http://HOST:PORT/api/users
	router.post('/', userController.addUser);

//	METHOD PUT| PATH http://HOST:PORT/api/users/:id
	router.put('/:id', userController.updateUser);

//	METHOD DELETE| PATH http://HOST:PORT/api/users/:id
	router.delete('/:id', userController.deleteUser);

	module.exports = router;