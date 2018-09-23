	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose	= require('mongoose');
	
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	USER SCHEMA.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const UserSchema  = require('./schemas/index');
	
	module.exports = {
		models: {
			user: require('./user/model/model.user'),
			task: require('./user/model/model.task'),
		}
	};