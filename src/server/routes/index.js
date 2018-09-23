	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX ROUTES.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
		api: {
			users: require( './route.api.users' ),
		},
		sign:{
			in: require( './route.api.signin' ),
			out: require( './route.api.signout' ),
		},
	}