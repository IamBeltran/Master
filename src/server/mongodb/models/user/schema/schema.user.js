	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose			= require('mongoose');
	const uniqueValidator 	= require('mongoose-unique-validator');

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MY-MODULES DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const { 
		isLocked
	} = require('./schema.user.virtuals');
	
	const {
		pre: {
			save
		}
	} = require('./schema.user.pre');
	
	const {
		comparePassword,
		incLoginAttempts
	} = require('./schema.user.methods');
	
	const {
		failedLogin,
		getAuthenticated
	} = require('./schema.user.statics');

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	DECLARATION OF CONSTANTS.														│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const Schema = mongoose.Schema;

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	SCHEMA FOR USER																	│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const UserSchema = new Schema({
		name: { 
			firtsName: {
				type: String,
				lowercase: true,
				trim: true,
				required: [ true, 'Se necesita un nombre' ]
			},
			middleName: {
				type: String,
				lowercase: true,
				trim: true,
				required: false
			},
			lastName: {
				type: String,
				lowercase: true,
				trim: true,
				required: [ true, 'Se necesita un apellido' ]
			},
			fullName: {
				type: String,
				lowercase: true,
				required: false
			}
		},
		nickName: {
			type: String,
			lowercase: true,
			trim: true,
			required: [ true,'Se necesita un nombre de usuario' ],
			match:[
				/^[a-z0-9_-]{3,10}$/,
				'El ususario solo puede contener 10 caracteres alfanumericos, solo minisculas, tambien incluyendo guion medio y bajo'
			],
			unique: true
		},
		gender: {
			type: String,
			lowercase: true,
			enum: [ 'm' , 'f' ],
			required: [ true, 'Asigna un genero al usuario' ]
		},
		avatar: {
			img: {
				type: String,
				enum: [ 'default' , 'nickname' ],
				default: 'default'
			},
			path: {
				type: String,
			}
		},
		password: {
			type: String,
			required: true,
			trim: true,
			match: [	
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 
				'Contraseña debil, 8 caracteres minimo, con contenido alphanumerico incluyendo mayusculas'
			],
			select: false
		},
		role: {
			type: String,
			lowercase: true,
			enum: [ 'viewfinder', 'user', 'editor', 'administrator', 'supervisor' ],
			default: 'user'
		},
		level: {
			type: Number,
			enum: [ 1, 3, 7, 15, 31 ],
		},
		status: {
			type: String,
			lowercase:true,
			trim: true,
			enum: [ 'active', 'inactive','locked' ],
			default: 'active',
		},
		lastConnection: {
			type: Date
		},
		loginAttempts: {
			type: Number,
			required: true,
			default: 0
		},
		lockUntil: {
			type: Date
		}
	},// You should be aware of the outcome after set to false
	{ 
		versionKey: false,
		timestamps: true
	});

	UserSchema.index({ fullName: 1 }, { sparse: true });

//	──[ VIRTUALS FOR USER. ]─────────────────────────────────────────────────────────────
	UserSchema.virtual('isLocked').get(isLocked);

//	──[ PRE-SAVE FOR USER. ]─────────────────────────────────────────────────────────────
	UserSchema.pre('save', save);

//	──[ METHODS FOR USER. ]──────────────────────────────────────────────────────────────
	UserSchema.methods.comparePassword = comparePassword;
	UserSchema.methods.incLoginAttempts = incLoginAttempts;

//	──[ STATICS FOR USER. ]──────────────────────────────────────────────────────────────
	UserSchema.statics.failedLogin = failedLogin;

	var reasons = UserSchema.statics.failedLogin
	UserSchema.statics.getAuthenticated = getAuthenticated;

	module.exports = UserSchema;
