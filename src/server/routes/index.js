	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX ROUTES.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
		api: {
			users: require( './route.api.users' ),
		},
		sign:{
			in: require( './route.signin' ),
			out: require( './route.signout' ),
		},
	}