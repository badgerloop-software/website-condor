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
		getTeams().then( (result) => {
			let finalObj = {};
			for (x of result) {
				getTeamLeads(x).then( (result) => {
					finalObj[x] = result;
				});
			}

			response.end(JSON.stringify(finalObj));
		}).catch( (err) => {
			//TODO: do something with errors. 
		})
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

