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
    response.end(mongoConnect(findTeamleads));
  }

}).listen(3005);

function mongoConnect(callback) {
  MongoClient.connect(creds.dbURL, function(err, client) {
    let db = client.db(creds.db);

    let response = callback(db);

    client.close();

    return response;
  });
}

function findTeamleads(db) {
  let collection = db.collection('teamleads');

  collection.find({}).toArray((err, data) => {
    return data;
    // for (x of docs) {
    //   console.log(`new line: ${x}`);
    //   console.log(Object.keys(x));
    //   for (let i = 0; i < Object.keys(x).length; i++) {
    //     console.log(`${Object.keys(x)[i]} : ${x[Object.keys(x)[i]]}`);
    //   }
    // }
  });
}
