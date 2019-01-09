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

		let responseObj = [];
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
		mongoConnect().then((client) => {
			let db = client.db(creds.db);
			return findTeams(db);
		}).then((teams) => {
			console.log(`got teams: ${teams}`);
			return teamDriver(db, teams);	
		}).then((teamLeads) => {
			client.close();
			console.log(`finished product: ${teamLeads}`);
			response.end(JSON.stringify(teamLeads));
		}).catch((err) => {
			//TODO: handle errors
		});
	}	



}).listen(3005);

function mongoConnect() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(creds.dbURL, function(err, client) {
      let db = client.db(creds.db);
      resolve(client);
    });
  });
}

function findTeamleads(db, team) {
	return new Promise((resolve, reject) => {
		let collection = db.collection('teamleads');

		//TODO: make query that finds sorted alphabetically by "TEAM"
		collection.find({'Team': team}).toArray((err, data) => {
			resolve(data);
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

function teamDriver(db, teams) {
	return new Promise( (resolve, reject) => {
		let promiseList = [];
		let resultList = {};
		for (let x of teams) {
			promiseList.push(findTeamleads(db, team).then( (teamLeads) => {
				resultList[x] = teamLeads;
			}));
		}

		Promise.all(promiseList).then( () => {
			resolve(resultList);
		});
	});
}