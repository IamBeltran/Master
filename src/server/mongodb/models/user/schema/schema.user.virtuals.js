	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose			= require('mongoose');
	const uniqueValidator 	= require('mongoose-unique-validator');
	const bcrypt			= require('bcryptjs');

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MY-MODULES DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	DECLARATION OF CONSTANTS.														│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const Schema = mongoose.Schema;
	const SALT_WORK_FACTOR = 10;
	const MAX_LOGIN_ATTEMPTS = 10;
	const LOCK_TIME = 2 * 60 * 60 * 1000;

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	MODULE EXPORTS.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
		isLocked:	function (){
			//	CHECK FOR A FUTURE LOCKUNTIL TIMESTAMP
			return !!(this.lockUntil && this.lockUntil > Date.now());
		},

	};
