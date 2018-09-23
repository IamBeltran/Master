"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const mongoose	= require('mongoose');
	const Schema	= mongoose.Schema;

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE PLUGGINS AND METHODS.													│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const pre	= require('./model.task.pre');

//	──[	SCHEMA FOR TASK. ]───────────────────────────────────────────────────────────────
	const TaskSchema = new Schema({
		subject: {
			type: String,
			lowercase: true,
			required: true
		},
		description: {
			type: String,
			lowercase: true,
			required: true
		},
		isPrivate: {
			type: Boolean,
			default: false
		},
		complete: {
			type: Number,
			default: 0
		},
		status: {
			type: String,
			lowercase: true,
			enum: ['overdue','completed','active', 'not started'],
			default: 'not started'
		},
		priority: {
			type: String,
			lowercase: true,
			enum: ['high','low','normal'],
			default: 'normal'
		},
		taskBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		categorie: {
			name: {
				type: String,
				lowercase: true,
			},
			color: {
				type: String,
				uppercase:true
			},
		}
	},
	{ // You should be aware of the outcome after set to false
		versionKey: false,
		timestamps: true
	});

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	TaskSchema.pre('save', pre.save);

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = TaskSchema;