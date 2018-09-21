	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	MODULE OF CONFIGURATION															│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	module.exports = {
//		CONFIGURATION OF THE SERVER PORT
		SERVER:{
			PORT: process.env.PORT || 3000,
		},

//		CONFIGURATION OF THE CONNETION MONGO DB  URI 
//		MONGODB://USERNAME:PASSWORD@HOST1:PORT1/DATABASE?OPTIONS
		MONGODB:{
			SERVER: "mongodb://",
			HOST: "localhost",
			PORT: "27017",
			NAME: "GATITOS",
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
//		CONFIGURATION OF THE SECRET KEY API
		SECRET_TOKEN: "MabelPines565"
	};