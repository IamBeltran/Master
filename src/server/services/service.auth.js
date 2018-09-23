	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const jwt   = require('jsonwebtoken');

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = function verifyJWTToken(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
				try {
					if (!decodedToken) throw "TOKEN INVALID";
				} catch (error) {
					return reject(err)
				}
				resolve(decodedToken)
			})
		})
	}

// https://github.com/IamBeltran/Server-ExpresJS.git