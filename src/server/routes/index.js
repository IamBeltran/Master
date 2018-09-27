	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	INDEX ROUTES.																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
		api: {
			users: require( './route.api.users' ),
		},
		sign:{
			in: require( './route.sign.in' ),
			out: require( './route.sign.out' ),
		},
	}