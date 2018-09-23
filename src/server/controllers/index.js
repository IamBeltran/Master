	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX CONTROLLER.																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
		userController: require( '../mongodb/models/user/controller/controller.user' ),
		signController: require('./controller.sign'),
	}