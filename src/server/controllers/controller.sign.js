	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MODEL USER																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const User 	= require('../mongodb/models/user/model/model.user');

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = {
		sign: {
			in: async (request, response, next) => {
					/*const id = request.params.id;
					const user = await User.findById(id)
					.then(user => {
						response.status(201).json({
							susuccess: true,
							message: `SHOW USER BY ID: ${id}`,
							user
						});
					})
					.catch(err => {
						response.status(500).json({
							susuccess: false,
							message: `ERROR ON SHOW THE USER: ${err}`
						});
					});*/
					response.status(201).json({
						susuccess: true,
						message: `hello world`
					});
				},
			out:async (request, response, next) => {
				/*const id = request.params.id;
				const user = await User.findById(id)
				.then(user => {
					response.status(201).json({
						susuccess: true,
						message: `SHOW USER BY ID: ${id}`,
						user
					});
				})
				.catch(err => {
					response.status(500).json({
						susuccess: false,
						message: `ERROR ON SHOW THE USER: ${err}`
					});
				});*/
				response.status(201).json({
					susuccess: true,
					message: `hello world`
				});
			},
		}
    };