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
		console.log(getTeams());
	}	

}).listen(3005);

function getTeams() {
	return new Promise((resolve, reject) => {
		const client = new MongoClient(creds.dbURL);

		client.connect(function(err) {
			if (!err) {
				console.log("Connected successfully to server");
				const db = client.db(creds.db);
				
				db.teamleads.distinct('Teams', (err, data) => {
					if (!err) {
						resolve(data);
					} else {
						reject(err);
					}
				});

				client.close();
			} else {
				console.log(`error: ${err}`);
			}
		});
	});
}

