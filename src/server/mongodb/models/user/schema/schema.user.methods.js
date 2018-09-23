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
		comparePassword: function(candidatePassword, cb) {
			bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
				if (err) return cb(err);
				cb(null, isMatch);
			});
		},
		incLoginAttempts: function(cb) {
			// if we have a previous lock that has expired, restart at 1
			if (this.lockUntil && this.lockUntil < Date.now()) {
				return this.update({
					$set: { loginAttempts: 1 },
					$unset: { lockUntil: 1 }
				}, cb);
			}
			
			// otherwise we're incrementing
			var updates = { $inc: { loginAttempts: 1 } };
			
			// lock the account if we've reached max attempts and it's not locked already
			if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
				updates.$set = { lockUntil: Date.now() + LOCK_TIME };
			}
			return this.update(updates, cb);
		}

	};
