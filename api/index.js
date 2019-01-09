let MongoClient = require('mongodb');
let http = require('http');
let url = require('url');
let fs = require('fs');

let creds;
fs.readFile('creds.json', 'utf8', function (err, data) {
  if (err) throw err;
  creds = JSON.parse(data);
});
 
http.createServer((request, response) => {
	let pathName = url.parse(request.url).pathname;

  // if (pathName === "/teamleads" && request.method === "GET") {
  //   mongoConnect(findTeamleads).then((mongoResponse) => {
  //     response.setHeader("Access-Control-Allow-Origin", "*");
  //     response.end(JSON.stringify(mongoResponse));
  //   }).catch((err) => {
  //     //TODO: handle error	    
  //   });
  // }

	if (pathName === "/teamleads" && request.method === "GET") {
		response.end(JSON.stringify(findTeamLeads("Administrative")));
		/*
			Trying to query based on each team returned from the initial query. 
			Will need to rewrite mongoConnect and findTeamleads. 
			Want to return 
			{
				teamName: [team leads in team (arr of objects)],
				teamName1: [team leads in team1 (arr of objects)],
				...
			}
		*/
		

	}	

}).listen(3005);

function mongoConnect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(creds.dbURL, function(err, client) {
      resolve(client);
    });
  });
}

function findTeamleads(team) {
	mongoConnect().then((client) => {
		return new Promise((resolve, reject) => {
			let db = client.db();
			let collection = db.collection('teamleads');
	
			//TODO: make query that finds sorted alphabetically by "TEAM"
			collection.find({'Team': team}).toArray((err, data) => {
				console.log(`data found from findTeamleads(): ${data}`);
				resolve(data);
			});
		});
	});

}

function findTeams(db) {
  return new Promise((resolve, reject) => {
    let collection = db.collection('teamleads');

    collection.distinct("Team", (err, data) => {
      resolve(data);
    });
  });
}
