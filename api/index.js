let http = require('http');
let url = require('url');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;


let creds;
fs.readFile('creds.json', 'utf8', function (err, data) {
  if (err) throw err;
  creds = JSON.parse(data);
});
 
http.createServer((request, response) => {
	let pathName = url.parse(request.url).pathname;

	if (pathName === "/teamleads" && request.method === "GET") {
		let finalObj = {};
		let promiseList = [];
		getTeams().then( (teams) => {
			return getTeamLeadsDriver(teams);
		}).then((result) => {
			response.end(JSON.stringify(result))
		}).catch( (err) => {
			//TODO: do something with errors. 
			console.log(`error: ${err}`);
		});
	}	

}).listen(3005);

function getTeams() {
	return new Promise((resolve, reject) => {
		let client = new MongoClient(creds.dbURL);

		client.connect(function(err) {
			if (!err) {
				let db = client.db(creds.db);
				
				db.collection('teamleadz').distinct('Team', (err, result) => {
					console.log(`RESULT FROM GETTEAMS(): ${result}, TYPEOF: ${typeof(result)}`);
					if (err) {
						reject(err);
					} else if ( result === "" ) {
						reject("Empty object returned from MongoDB in getTeamLeads() within api/index.js")
					} else {
						resolve(result);
					}
				});

				client.close();
			} else {
				reject(err);
			}
		});
	});
}

function getTeamLeads(team) {
	return new Promise((resolve, reject) => {
		let client = new MongoClient(creds.dbURL);

		client.connect(function(err) {
			if (!err) {
				let db = client.db(creds.db);
				db.collection('teamleads').find( { "Team": team } ).toArray( (err, result) => {
					console.log(`RESULT FROM GETTEAMLEADS(): ${result}`);
					if (err) {
						reject(err);
					} else if ( result == {} ) {
						reject("Empty object returned from MongoDB in getTeamLeads() within api/index.js")
					} else {
						resolve(result);
					}
				});

			} else {
				reject(err);
			}

			client.close();
		});
	});
}

function getTeamLeadsDriver(teams) {
	return new Promise((resolve, reject) => {
		let promiseList = [];
		let resultObject = {};
		for (let x of teams) {
			promiseList.push(getTeamLeads(x).then((result) => {
				resultObject[x] = result;
			}));
		}
	
		Promise.all(promiseList).then( () => {
			resolve(resultObject);
		});
	});

}
