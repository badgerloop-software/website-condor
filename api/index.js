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
		});
	}	

}).listen(3005);

function getTeams() {
	return new Promise((resolve, reject) => {
		let client = new MongoClient(creds.dbURL);

		client.connect(function(err) {
			if (!err) {
				console.log("Connected successfully to server");
				let db = client.db(creds.db);
				
				db.collection('teamleads').distinct('Team', (err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(err);
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
				
				db.collection('teamleads').find({'Team': team}).toArray( (err, result) => {
					if (!err) {
						resolve(result);
					} else {
						reject(err);
					}
				});

				client.close();
			} else {
				reject(err);
			}
		});
	});
}

function getTeamLeadsDriver(teams) {
	return new Promise((resolve, reject) => {
		let promistList = [];
		let resultObject = {};
		for (let x of teams) {
			promistList.push(getTeamLeads(teams[x]).then((result) => {
				console.log(`result: ${result}`);
				resultObject[x] = result;
			}));
		}
	
	
		Promise.all(promistList).then( () => {
			resolve(resultObject);
		});
	});

}
