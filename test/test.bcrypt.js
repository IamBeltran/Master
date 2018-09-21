	"use strict";
//	┌───────────────────────────────────────────────────────────────────────────────────┐
//	│	REQUIRE NODE-MODULE DEPENDENCIES.												│
//	└───────────────────────────────────────────────────────────────────────────────────┘
	const bcrypt = require('bcryptjs');

	const CRYPT = {
		
		_GENHASH: (_string) => {
			try {
				if(typeof _string === "undefined"){
					throw 'ERROR: NULL_STRING';
				};

				if(typeof _string !== "string" ) {
					throw 'ERROR: WRONG_TYPE_VARIABLE';
				};
			} catch( err ) {
				return err;
			}
			var salt = bcrypt.genSaltSync(10);
			var hash = bcrypt.hashSync(_string, salt);
			return hash;
		},
		
		_COMPAREHASH: (_string, _hash) => {
			try {
//				ERROR NULL 0
				if( typeof _string === "undefined" 
				&&  typeof _hash !== "string" ){
					throw 'ERROR: NULL_STRING AND WRONG_TYPE_HASH';
				};
//				ERROR 0 NULL
				if( typeof _string !== "string" 
				&&  typeof _hash === "undefined" ){
					throw 'ERROR: WRONG_TYPE_STRING AND NULL_HASH';
				};
//				ERROR NULL 0
				if( typeof _string === "undefined" 
				&&  typeof _hash !== "string" ){
				throw 'ERROR: NULL_STRING AND WRONG_TYPE_HASH';
				};
//				ERROR NULL NULL
				if( typeof _string === "undefined" 
				&&  typeof _hash === "undefined" ){
					throw 'ERROR: NULL_DATA';
				};
//				ERROR 1 NULL
				if( typeof _string === "string" 
				&&  typeof _hash === "undefined" ){
					throw 'ERROR: NULL_HASH';
				};
//				ERROR 1 0
				if( typeof _string !== "string" 
				&&  typeof _hash === "undefined" ){
					throw 'ERROR: WRONG_TYPE_HASH';
				};
//				ERROR NULL 1
				if( typeof _string === "undefined" 
				&&  typeof _hash === "string" ){
					throw 'ERROR: NULL_STRING';
				};
//				ERROR NULL 1
				if( typeof _string !== "string" 
				&&  typeof _hash === "string" ){
					throw 'ERROR: WRONG_TYPE_STRING';
				};

			} catch( err ) {
				return err;
			}
			var hash = bcrypt.compareSync(_string, _hash);
			return hash;
		},
		
		_GET_INFORMATION_OF_SALT:(_hash) => {
			try {
	
				if(typeof _hash === "undefined"){
					throw 'ERROR: NULL_HASH'
				};

				if(typeof _hash !== "string" ) {
					throw 'ERROR: WRONG_TYPE_VARIABLE'
				};
				
			} catch( err ) {
				return err;
			}
			var rounds = bcrypt.getRounds(_hash);
			var salt   = bcrypt.getSalt(_hash);
			return {
				rounds: rounds,
				salt:salt
			};
		}
	}

	var hash = 	CRYPT._GENHASH("HOLA MUNDO");
	var compare = 	CRYPT._COMPAREHASH("HOLA MUNDO",hash);
	var information = CRYPT._GET_INFORMATION_OF_SALT(hash);
	console.log(hash);
	console.log(compare);
	console.log(information);