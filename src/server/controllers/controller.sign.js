	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MODEL USER																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const User 	= require('../mongodb/models/user/model/model.user');

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = {
		in: async (request, response, next) => {
			response.status(201).json({
				susuccess: true,
				message: `hello world`
			});
		},
		out:async (request, response, next) => {
			response.status(201).json({
				susuccess: true,
				message: `hello world`
			});
		},
    };