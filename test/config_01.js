	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	MODULE OF CONFIGURATION															│
//	└───────────────────────────────────────────────────────────────────────────────────┘

// 	'production', 'development' or 'test'
	const env = process.env.NODE_ENV;
	
	const config = {
		production:{
//			CONFIGURATION OF THE SERVER PORT
			SERVER:{
				PORT: parseInt(process.env.DEV_APP_PORT) || 3000,
			},
//			CONFIGURATION OF THE CONNETION MONGO DB | URI MONGODB:
//			USERNAME:PASSWORD@HOST1:PORT1/DATABASE?OPTIONS
			MONGODB:{
				SERVER: "mongodb://",
				HOST: "localhost",
				PORT: "27017",
				NAME: "PROYECTO",
				OPTIONS: {
					user: "",
					pass: "",
					useNewUrlParser:	true,
					autoIndex:			true,
					reconnectTries:		Number.MAX_VALUE,
					reconnectInterval:	500,
					poolSize:			10,
					bufferMaxEntries:	0,
					connectTimeoutMS:	10000,
					socketTimeoutMS:	45000,
					family:				4
				}
			},
//			CONFIGURATION OF THE SECRET KEY API
			SECRET_TOKEN: "MabelPines565"
		},

		development: {
//			CONFIGURATION OF THE SERVER PORT
			SERVER:{
				PORT: parseInt(process.env.DEV_APP_PORT) || 3000,
			},
//			CONFIGURATION OF THE CONNETION MONGO DB | URI MONGODB:
//			USERNAME:PASSWORD@HOST1:PORT1/DATABASE?OPTIONS
			MONGODB:{
				SERVER: "mongodb://",
				HOST: "localhost",
				PORT: "27017",
				NAME: "DEVELOPMENT",
				OPTIONS: {
					user: "",
					pass: "",
					useNewUrlParser:	true,
					autoIndex:			true,
					reconnectTries:		Number.MAX_VALUE,
					reconnectInterval:	500,
					poolSize:			10,
					bufferMaxEntries:	0,
					connectTimeoutMS:	10000,
					socketTimeoutMS:	45000,
					family:				4
				}
			},
//			CONFIGURATION OF THE SECRET KEY API
			SECRET_TOKEN: "MabelPines565"
			},
			
		test:{
//			CONFIGURATION OF THE SERVER PORT
			SERVER:{
				PORT: parseInt(process.env.DEV_APP_PORT) || 3000,
			},
//			CONFIGURATION OF THE CONNETION MONGO DB | URI MONGODB:
//			USERNAME:PASSWORD@HOST1:PORT1/DATABASE?OPTIONS
			MONGODB:{
				SERVER: "mongodb://",
				HOST: "localhost",
				PORT: "27017",
				NAME: "TEST",
				OPTIONS: {
					user: "",
					pass: "",
					useNewUrlParser:	true,
					autoIndex:			true,
					reconnectTries:		Number.MAX_VALUE,
					reconnectInterval:	500,
					poolSize:			10,
					bufferMaxEntries:	0,
					connectTimeoutMS:	10000,
					socketTimeoutMS:	45000,
					family:				4
				}
			},
//			CONFIGURATION OF THE SECRET KEY API
			SECRET_TOKEN: "MabelPines565"
		}
				

	};
	
	module.exports = config[env];
	

