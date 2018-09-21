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
		failedLogin: {
			NOT_FOUND: 0,
			PASSWORD_INCORRECT: 1,
			MAX_ATTEMPTS: 2
		},
		getAuthenticated: function(nickName, password, cb) {
			this.findOne({ nickName: nickName },{
				_id:1, 
				nickName:1, 
				fullName:1,
				role:1,
				level:1, 
				status:1, 
				password:1,
				loginAttempts:1,
				lockUntil:1
			},

			function(err, user) {
				if (err) return cb(err);

				if (!user) {
				return cb(null, null, reasons.NOT_FOUND);
			}
			
			// check if the account is currently locked
			if (user.isLocked) {
				// just increment login attempts if account is already locked
				return user.incLoginAttempts(function(err) {
					if (err) return cb(err);
					return cb(null, null, reasons.MAX_ATTEMPTS);
				});
			}
			// test for a matching password
			user.comparePassword(password, function(err, isMatch) {
				if (err) return cb(err);

				// check if the password was a match
				if (isMatch) {
				// if there's no lock or failed attempts, just return the user
				if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
				// reset attempts and lock info
				var updates = {
					$set: { loginAttempts: 0 },
					$set: { lastConnection: Date.now() },
					$unset: { lockUntil: 1 }
				};
				return user.update(updates, function(err) {
					if (err) return cb(err);
					return cb(null, user);
				});
			}

			// password is incorrect, so increment login attempts before responding
			user.incLoginAttempts(function(err) {
				if (err) return cb(err);
					return cb(null, null, reasons.PASSWORD_INCORRECT);
				});
			});
		});

		}

	};
