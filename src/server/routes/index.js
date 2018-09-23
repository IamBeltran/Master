	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX ROUTES.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
		api: {
			users: require( './route.api.users' ),
			tasks: require( './route.api.tasks' ),
			sign: require( './route.api.sign' ),
		},
	}