	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX CONTROLLER.																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
		userController: require( '../mongodb/models/user/controller/controller.user' ),
		signInController: require('./controller.sign'),
	}