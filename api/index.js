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

  if (pathName === "/teamleads" && request.method === "GET") {
    mongoConnect(findTeamleads).then((mongoResponse) => {
      response.end(JSON.stringify(mongoResponse));
    }).catch((err) => {
      //TODO: handle error	    
    });
  }

}).listen(3005);

function mongoConnect(callback) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(creds.dbURL, function(err, client) {
      let db = client.db(creds.db);

      callback(db).then((data) => {
        client.close();
        resolve(data);
      }).catch((err) => {
        //TODO: handle error     
      });
    });
  });
}

function findTeamleads(db) {
  return new Promise((resolve, reject) => {
    let collection = db.collection('teamleads');
    //TODO: make query that finds sorted alphabetically by "TEAM"
    collection.find({}).toArray((err, data) => {
      resolve(data);
    });
  });
}
