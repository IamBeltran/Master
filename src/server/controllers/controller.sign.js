	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MODEL USER																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const User 	= require('../mongodb/models/user/model/model.user');

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = {
		in: async (req, res, next) => {
			res.status(201).json({
				susuccess: true,
				message: `hello world`
			});
		},
		out: async (req, res, next) => {
			res.status(201).json({
				susuccess: true,
				message: `hello world`
			});
		},
    };