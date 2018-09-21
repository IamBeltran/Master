	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const moment	= require('moment');
	const winston 	= require('winston');

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	DECLARATION OF CONSTANTS.														│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const path	= require('path');

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	DESTRUCTURING OF OBJETS.														│
//	└───────────────────────────────────────────────────────────────────────────────────┘

//	──[ DESTRUCTURING WINSTON. ]─────────────────────────────────────────────────────────
	const {
		createLogger,
		format,
		transports,
		config
	} = winston;

//	──[ DESTRUCTURING FORMAT. ]──────────────────────────────────────────────────────────
	const {
		combine,
		timestamp,
		label,
		simple,
		printf,
		colorize,
		prettyPrint
	} = format;

//	──[ DESTRUCTURING ADDCOLORS. ]───────────────────────────────────────────────────────
	const { addColors } = config;
	
	const FORMAT_FILE = combine(
		colorize(),
		printf( info => {
			return `[${moment(info.timestamp).format('YYYY-MM-DD hh:mm:ss a')}] ${info.level}: ${info.message}`;
		})
	);

	const FORMAT_CONSOLE_INFO = combine(
		colorize(),
		printf( info => {
			return ` ${info.level}: ${info.message}`;
		})
	);

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	DECLARATION OF OPTIONS.															│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const options = {
		colors: {
			error: 'red',
			debug: 'blue',
			warn: 'yellow',
			data: 'grey',
			info: 'green',
			verbose: 'cyan',
			silly: 'magenta',
			custom: 'yellow'
		},
		transports:{
			file:{
				error:{
					level: 'error',
				//	filename: path.join(__dirname, '..','logs','error.log'),
					filename: 'error.log',
					handleExceptions: true,
					json: true,
					maxsize: 5242880, // 5MB
					maxFiles: 5,
					colorize: false,
					timestamp: true
				},
				info:{
					level: 'info',
				//	filename: path.join(__dirname, '..','logs','info.log'),
					filename: 'info.log',
					handleExceptions: true,
					json: true,
					maxsize: 5242880, // 5MB
					maxFiles: 5,
					colorize: false,
				}
			},
			console: {
				level: "info",
				format: FORMAT_CONSOLE_INFO,
				handleExceptions: true,
				json: false,
			}
		}
	};
	
	addColors(options.colors);

	const logger = createLogger({		
		transports: [
			new transports.File(options.transports.file.error),
			new transports.File(options.transports.file.info),
		],
		
	});

	if (process.env.NODE_ENV !== 'production') {
		logger.add(new transports.Console(options.transports.console));
	}
	
	logger.stream = { 
		write: function(message, encoding){
			logger.info(message.trim()); 
		} 
	};
		
	logger.log({
		level: 'info',
		message: 'This is a message info'
	});

	logger.log({
		level: 'error',
		message: 'This is a message error'
	});



	
	module.exports = { logger };

