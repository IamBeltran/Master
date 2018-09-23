	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose	= require('mongoose');
	
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	TASK SCHEMA.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const TaskSchema  = require('../schema/schema.task');

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────	
	module.exports = mongoose.model('task', TaskSchema);