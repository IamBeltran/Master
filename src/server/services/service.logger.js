	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const winston			= require('winston');
	const DailyRotateFile	= require('winston-daily-rotate-file');
	const moment			= require('moment-timezone');

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
		align,
		prettyPrint
	} = format;

//	──[ DESTRUCTURING ADDCOLORS. ]───────────────────────────────────────────────────────
	const { addColors } = config;

//	──[ SETTING COLORS. ]────────────────────────────────────────────────────────────────
	const OPTION_COLORS = {
		error: 'red',
		debug: 'blue',
		warn: 'yellow',
		data: 'grey',
		info: 'green',
		verbose: 'cyan',
		silly: 'magenta',
		custom: 'yellow'
	};

	addColors(OPTION_COLORS);	

//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	FORMAT TO TRANSPORTS.															│
//	└───────────────────────────────────────────────────────────────────────────────────┘

//	──[ FORMAT ERROR. ]──────────────────────────────────────────────────────────────────
	const ENUMERATE_ERROR_FORMAT = format( info => {
		if (info.message instanceof Error) {
			info.message = Object.assign({ 
			//	code: info.message.code,
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

//	──[ FORMAT TIMESTAMP. ]──────────────────────────────────────────────────────────────
	const APPEND_TIMESTAMP = format((info, opts) => {
		if(opts.tz)
			info.timestamp = moment().tz(opts.tz).format('hh:mm:ss a YYYY-MM-DD');
		return info;
	});

//	──[ FORMAT FILE. ]───────────────────────────────────────────────────────────────────
	const FORMAT_FILE =  combine(
		ENUMERATE_ERROR_FORMAT(),
		timestamp(),
		json(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`)
	);
	const FORMAT_FILE_DEBUG =  combine(
		ENUMERATE_ERROR_FORMAT(),
		timestamp(),
		prettyPrint(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`)
	);

//	──[ FORMAT CONSOLE. ]────────────────────────────────────────────────────────────────
	/*const FORMAT_CONSOLE =  combine(
		timestamp(),
		colorize({all:true}),
		//align(),
		//prettyPrint(),
		printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`)
	);*/

	const FORMAT_CONSOLE =  combine(
		ENUMERATE_ERROR_FORMAT(),
		colorize({all:true}),
		timestamp(),
		printf((info) => {
			const {
				timestamp, label, level, message, ...args
			} = info;
			return `| ${timestamp} [${level}] [${label}] → ${message}: ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
		}),
	);
	
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	CREATION OF TRANSPORTS.															│
//	└───────────────────────────────────────────────────────────────────────────────────┘

//	──[ LOGGER FOR MONGODB. ]────────────────────────────────────────────────────────────
	const LOGGER_MONGODB = createLogger({
		level:'info',
		format: combine(
			label({ label: 'LOGGER MONGODB' }),
			APPEND_TIMESTAMP({ tz: 'America/Mexico_City' }),
		),
		transports: [
			new transports.Console({
				level: 'silly',
				handleExceptions: false,
				json: false,
				colorize: true,
				format: FORMAT_CONSOLE,
				//options: { flags: 'a', mode: 0o666 },
				options: {flags: 'a+', encoding: 'utf8', mode: 0o666},
			}),
			new transports.File({
				level: 'error',
				filename: path.join(__dirname, '..','log','LOGGER_MONGODB','LOGGER_MONGODB_0.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'warn',
				filename: path.join(__dirname, '..','log','LOGGER_MONGODB','LOGGER_MONGODB_1.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
		],
		exitOnError: false,
		silent: false
	});

//	──[ LOGGER FOR EXPRESS. ]─────────────────────────────────────────────────────────────
	const LOGGER_EXPRESS = createLogger({
		level:'info',
		format: combine(
			label({ label: 'LOGGER EXPRESS' }),
			APPEND_TIMESTAMP({ tz: 'America/Mexico_City' }),
		),
		transports: [
			new transports.Console({
				level: 'silly',
				handleExceptions: false,
				json: false,
				colorize: true,
				format: FORMAT_CONSOLE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'error',
				filename: path.join(__dirname, '..','log','LOGGER_EXPRESS','LOGGER_EXPRESS_0.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'warn',
				filename: path.join(__dirname, '..','log','LOGGER_EXPRESS','LOGGER_EXPRESS_1.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'info',
				filename: path.join(__dirname, '..','log','LOGGER_EXPRESS','LOGGER_EXPRESS_2.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
		],
		exitOnError: false,
		silent: false
	});

//	──[ LOGGER FOR SERVER. ]─────────────────────────────────────────────────────────────
	const LOGGER_SERVER = createLogger({
		level:'info',
		format: combine(
			label({ label: 'LOGGER SERVER' }),
			APPEND_TIMESTAMP({ tz: 'America/Mexico_City' }),
		),
		transports: [
			new transports.Console({
				level: 'silly',
				handleExceptions: false,
				json: false,
				colorize: true,
				format: FORMAT_CONSOLE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'error',
				filename: path.join(__dirname, '..','log','LOGGER_SERVER','LOGGER_SERVER_0.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'warn',
				filename: path.join(__dirname, '..','log','LOGGER_SERVER','LOGGER_SERVER_1.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'info',
				filename: path.join(__dirname, '..','log','LOGGER_SERVER','LOGGER_SERVER_2.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
		],
		exitOnError: false,
		silent: false
	});

//	──[ LOGGER FOR DEBUG. ]──────────────────────────────────────────────────────────
	const LOGGER_DEBUG = createLogger({
		level:'info',
		format: combine(
			label({ label: 'LOGGER SERVER' }),
			APPEND_TIMESTAMP({ tz: 'America/Mexico_City' }),
		),
		transports: [
			new transports.Console({
				level: 'silly',
				handleExceptions: false,
				json: false,
				colorize: true,
				format: FORMAT_CONSOLE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'info',
				filename: path.join(__dirname, '..','log','LOGGER_DEBUG_2.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				json: true,
				colorize: false,
				format: FORMAT_FILE_DEBUG,
				options: { flags: 'a', mode: 0o666 }
			}),
		],
		exitOnError: false,
		silent: false
	});

//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
	module.exports = {		
		LOGGER_MONGODB,
		LOGGER_EXPRESS,
		LOGGER_SERVER,
		LOGGER_DEBUG,
	}

