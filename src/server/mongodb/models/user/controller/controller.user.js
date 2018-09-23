	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MODEL USER																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const User 	= require('../model/model.user');

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = {

//	──[ GET-USER. ]─────────────────────────────────────────────────────────────────────
		getUsers: async(request, response, next)=>{
			// Model.find(conditions, [projection], [options], [callback])
			const user = await User.find()
			.then(user => {
				response.status(201).json({
					susuccess: true,
					message: `SHOW ALL USERS`,
					user
				});
			})
			.catch(err => {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON SHOW THE USERS: ${err}`,
				});
			});
		},

//	──[ GET-USER. ]──────────────────────────────────────────────────────────────────────
		getUser: async (request, response,next) => {
			const id = request.params.id;
			const user = await User.findById(id)
			.then(user => {
				response.status(201).json({
					susuccess: true,
					message: `SHOW USER BY ID: ${id}`,
					user
				});
			})
			.catch(err => {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON SHOW THE USER: ${err}`
				});
			});
		},

//	──[ ADD-USER. ]─────────────────────────────────────────────────────────────────────
		addUser: async (request, response, next) => {
			const {
				name,
				nickName,
				gender,
				password,
				role,
			} = request.body;
			const user = new User({
				name,
				nickName,
				gender,
				password,
				role,
			});
			await user.save()
			.then(user => {
				response.status(201).json({
					susuccess: true,
					message:'USER SAVED',
					user
				});
			})
			.catch(err	=> {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON CREATING USER: ${err}` 
				});
			});
		},

//	──[ UPDATE-USER. ]───────────────────────────────────────────────────────────────────
		updateUser: async (request, response, next) => {
			const id = request.params.id;
			const {
				subject,
				description,
				isPrivate,
				complete,
				status,
				priority,
				taskBy,
				categorie 
			} = request.body;
			const newTask = {
				subject,
				description,
				isPrivate,
				complete,
				status,
				priority,
				taskBy,
				categorie
			};
			//const newTask = {title, description};
			await Task.findByIdAndUpdate(id,newTask)
			.then(newtask => {
				response.status(201).json({
					susuccess: true,
					message:'USER UPDATED',
					newtask
				});
			})
			.catch(err	=> {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON UPDATED THE USER: ${err}` 
				});

			});
		},

//	──[ DELETE-USER. ]───────────────────────────────────────────────────────────────────
		deleteUser: async (request, response, next) => {
			const id = request.params.id;
			await User.findByIdAndRemove(id)
			.then(user => {
				response.status(201).json({
					susuccess: true,
					message:'USER DELETE'
				});
			})
			.catch(err	=> {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON DELETE THE USER: ${err}`
				});
			});
		}

	};