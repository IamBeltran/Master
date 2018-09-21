/**
 *
 *	A LOGGER ACCEPTS THE FOLLOWING PARAMETERS:	
 *
 *	NAME			DEFAULT					DESCRIPTION
 *
 *	level:			'info'					Log only if info.level less than or equal to this level.
 *	levels:			winston.config.npm		Levels (and colors) representing log priorities.
 *	format:			winston.format.json		Formatting for info messages (see: Formats).
 *	transports:		[] (No transports)		Set of logging targets for info messages.
 *	exitOnError:	true					If false, handled exceptions will not cause process.exit.
 *	silent:			false					If true, all logs are suppressed.
 *
 *	FINALIZING FORMATS:
 *	
 *	json
 *	logstash
 *	printf
 *	prettyPrint
 *	simple
 *
 *	Levels:
 *	---------
 *
 *	error:		0
 *	warn:		1
 *	info:		2
 *	verbose:	3
 *	debug:		4
 *	silly:		5
 *
 *	LOG ENTRIES COMPONENT:
 *	-------------------------
 *
 *	1. timestamp
 *	2. level
 *	3. label
 *	4. message
 *
 *	COLORIZE:
 *	-------------------------
 *
 *	all
 *	level
 *	true
 *
 *	https://medium.com/front-end-hacking/node-js-logs-in-local-timezone-on-morgan-and-winston-9e98b2b9ca45
 *	https://gist.github.com/Xeoncross/b8a735626559059353f21a000f7faa4b *
 *	https://blog.michaelscepaniak.com/fixed-length-level-logging-in-winston
 *	https://gist.github.com/Xeoncross/b8a735626559059353f21a000f7faa4b
 *	https://medium.com/front-end-hacking/node-js-logs-in-local-timezone-on-morgan-and-winston-9e98b2b9ca45
 *	https://blog.michaelscepaniak.com/fixed-length-level-logging-in-winston
 *	https://medium.com/@tobydigz/logging-in-a-node-express-app-with-morgan-and-bunyan-30d9bf2c07a
 *	
 */
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
	const FORMAT_CONSOLE =  combine(
		timestamp(),
		colorize( true ),
		//align(),
		prettyPrint(),
		//printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`)
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
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'error',
				filename: path.join(__dirname,'LOGGER_MONGODB_0.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'warn',
				filename: path.join(__dirname,'LOGGER_MONGODB_1.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'info',
				filename: path.join(__dirname,'LOGGER_MONGODB_2.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
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
				filename: path.join(__dirname,'LOGGER_EXPRESS_0.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'warn',
				filename: path.join(__dirname,'LOGGER_EXPRESS_1.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'info',
				filename: path.join(__dirname,'LOGGER_EXPRESS_2.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
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
				filename: path.join(__dirname,'LOGGER_SERVER_0.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'warn',
				filename: path.join(__dirname,'LOGGER_SERVER_1.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
				json: true,
				colorize: false,
				format: FORMAT_FILE,
				options: { flags: 'a', mode: 0o666 }
			}),
			new transports.File({
				level: 'info',
				filename: path.join(__dirname,'LOGGER_SERVER_2.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
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
				filename: path.join(__dirname,'LOGGER_DEBUG_2.log'),
				maxsize: 5242880, // 5MB
				maxFiles: 5,
				zippedArchive: true,
				handleExceptions: false,
				zippedArchive: true,
				json: true,
				colorize: false,
				format: FORMAT_FILE_DEBUG,
				options: { flags: 'a', mode: 0o666 }
			}),
		],
		exitOnError: false,
		silent: false
	});
	LOGGER_DEBUG.info(LOGGER_MONGODB.transports[0]);