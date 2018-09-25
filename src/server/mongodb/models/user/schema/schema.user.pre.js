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
		pre:{
			save: function(next){
				var user = this;

				// If password Modified
				if (!user.isModified('password')) return next();

			
				bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
					if (err) return next(err);
					// hash the password using our new salt
					bcrypt.hash(user.password, salt, function(err, hash) {
						if (err) return next(err);
						// override the cleartext password with the hashed one
						user.password = hash;
						next();
					});
				});

				if(typeof user.name.middleName==="undefined"||user.name.middleName===""){
					user.name.fullName = `${user.name.firtsName} ${user.name.lastName}`;
				}else{
					user.name.fullName = `${user.name.firtsName} ${user.name.middleName} ${user.name.lastName}`;
				};

				switch( user.role ) {
					case 'VIEWFINDER':
						user.level = 1;
					break;
					case 'USER':
						user.level = 3;
					break;
					case 'EDITOR':
						user.level = 7;
					break;
					case 'ADMINISTRATOR':
						user.level = 15;
					break;
					case 'SUPERVISOR':
						user.level = 31;
					break;
				}
		
				if(user.avatar.img=="default"){
					user.avatar.path = user.gender;
				}else{
					user.avatar.path = user.nickName.toLowerCase();
				}

			}

		}
		
	};
