	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE MODEL TASK																│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const Models	= require('../mongodb/models/');
	const Task	 	= Models.Task;

	module.exports = {

//	──[ GET-TASKS. ]─────────────────────────────────────────────────────────────────────
		getTasks: async(request, response, next)=>{
			const tasks = await Task.find(null, {
				_id: 1,
				subject: 1,
				description: 1,
				isPrivate: 1,
				complete: 1,
				status: 1,
				priority: 1,
				taskBy: 1,
				categorie:1
			})
			.then(tasks => {
				response.status(201).json({
					susuccess: true,
					message: `SHOW ALL TASKS`,
					tasks
				});
			})
			.catch(err => {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON SHOW THE TASKS: ${err}`,
				});
			});
		},

//	──[ GET-TASK. ]──────────────────────────────────────────────────────────────────────
		getTask: async (request, response,next) => {
			const id = request.params.id;
			const task = await Task.findById(id)
			.then(task => {
				response.status(201).json({
					susuccess: true,
					message: `SHOW TASK BY ID: ${id}`,
					task
				});
			})
			.catch(err => {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON SHOW THE TASK: ${err}`
				});
			});
		},

//	──[ ADD-TASK. ]─────────────────────────────────────────────────────────────────────
		addTask: async (request, response, next) => {
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
			const task = new Task({
				subject,
				description,
				isPrivate,
				complete,
				status,
				taskBy,
				categorie
			});
			await task.save()
			.then(task => {
				response.status(201).json({
					susuccess: true,
					message:'TASK SAVED',
					task
				});
			})
			.catch(err	=> {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON CREATING THE TASK: ${err}` 
				});
			});
		},

//	──[ UPDATE-TASK. ]───────────────────────────────────────────────────────────────────
		updateTask: async (request, response, next) => {
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
					message:'TASK UPDATED',
					newtask
				});
			})
			.catch(err	=> {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON UPDATED THE TASK: ${err}` 
				});

			});
		},

//	──[ DELETE-TASK. ]───────────────────────────────────────────────────────────────────
		deleteTask: async (request, response, next) => {
			const id = request.params.id;
			await Task.findByIdAndRemove(id)
			.then(task => {
				response.status(201).json({
					susuccess: true,
					message:'TASK DELETE'
				});
			})
			.catch(err	=> {
				response.status(500).json({
					susuccess: false,
					message: `ERROR ON DELETE THE TASK: ${err}`
				});
			});
		},
	};