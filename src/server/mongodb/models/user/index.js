	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose	= require('mongoose');
	
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	USER SCHEMA.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const UserSchema  = require('./schemas/index');
	
	module.exports = User: mongoose.model('user', UserSchema);