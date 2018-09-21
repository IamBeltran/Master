	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
//	const moment	= require('moment');
	const moment	= require('moment-timezone');
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
		json,
		prettyPrint
	} = format;

//	──[ DESTRUCTURING ADDCOLORS. ]───────────────────────────────────────────────────────
	const { addColors } = config;
	
	const ENUMERATE_ERROR_FORMAT = format( info => {
		if (info.message instanceof Error) {
			info.message = Object.assign({
				message: info.message.message,
				stack: info.message.stack
			}, JSON.stringify(info.message));
		}
		
		if (info instanceof Error) {
			return Object.assign({
				message: info.message,
				stack: info.stack
			}, info);
		}
		return info;
	});
	
	const FORMAT_TIMESTAMP = format((info, opts) => {
		if(opts.tz) info.timestamp = moment().tz(opts.tz).format('hh:mm:ss a YYYY-MM-DD');
		return info;
	});

	const FORMAT_FILE = combine(
		ENUMERATE_ERROR_FORMAT(),
		FORMAT_TIMESTAMP({ tz: 'America/Mexico_City' }),
		printf(info => `| ${info.timestamp} [${info.level}]: ${info.label} - → ${info.message}`),
	);

	const FORMAT_CONSOLE_INFO = combine(
		colorize(),
		ENUMERATE_ERROR_FORMAT(),
		FORMAT_TIMESTAMP({ tz: 'America/Mexico_City' }),
		printf(info => `| ${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`),
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
					name:'error',
					level: 'error',
					filename: path.join(__dirname, '..','logs','error.log'),
					handleExceptions: true,
					maxsize: 5242880, // 5MB
					maxFiles: 5,
					timestamp: false,
					format: FORMAT_FILE_ERROR,
					colorize: false,
					options: { 
						flags: 'a', 
						mode: 0o666 
					},
				},
				info:{
					name:'info',
					level: 'info',
					filename: path.join(__dirname, '..','logs','info.log'),
					handleExceptions: true,
					exitOnError: false,
					maxsize: 5242880, // 5MB
					maxFiles: 5,
					timestamp: false,
					format: FORMAT_FILE_INFO,
					colorize: false,
					options: { 
						flags: 'a', 
						mode: 0o666 
					},
					exitOnError: false
				},
				exceptions:{
					filename: path.join(__dirname, '..','logs','exceptions.log'),
					handleExceptions: true,
				}
			},
			console: {
				level: "debug",
				format: FORMAT_CONSOLE_INFO,
				label: 'CONSOLE',
				colorize: true,	
			}
		}
	};
	
	addColors(options.colors);

	const logger = createLogger({		
		transports: [
			new transports.File(options.transports.file.error),
			new transports.File(options.transports.file.info),
			new transports.Console(options.transports.console),
		],
		exceptionHandlers: [
			new transports.File(options.transports.file.exceptions)
		],
		exitOnError: false // <--- set this to false
	});

	if (process.env.NODE_ENV !== 'production') {
		logger.add(new transports.Console(options.transports.console));
	}
	
	logger.stream = { 
		write: function(message, encoding){
			logger.debug(message.trim()); 
		} 
	};
/*	logger.debug({
		level: 'debug',
		message: 'This is a message info'
	});

	logger.log({
		level: 'error',
		message: 'This is a message error'
	});
	console.log('Run FIRST test...');
	logger.log({ level: 'error', message: new Error('FIRST test error') });*/
	
	module.exports = { logger };

