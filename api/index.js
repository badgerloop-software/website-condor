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

  console.log(pathName);

  if (pathName === "/teamleads" && request.method === "GET") {
    console.log("made it into if statement");
    mongoConnect(findTeamleads).then((mongoResponse) => {
      response.end(mongoResponse);
    }).catch((err) => {
	console.log(`error1: ${err}`);	    
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
	console.log(`error: ${err}`);      
      });
  
     // client.close();
  
      //resolve(response);
    });
  });

}

function findTeamleads(db) {
	return new Promise((resolve, reject) => {
		 let collection = db.collection('teamleads');

  		collection.find({}).toArray((err, data) => {
		console.log(data);
			resolve(data);
		});
	});
 // let collection = db.collection('teamleads');

  //collection.find({}).toArray((err, data) => {
    //return data;
    // for (x of docs) {
    //   console.log(`new line: ${x}`);
    //   console.log(Object.keys(x));
    //   for (let i = 0; i < Object.keys(x).length; i++) {
    //     console.log(`${Object.keys(x)[i]} : ${x[Object.keys(x)[i]]}`);
    //   }
    // }
  //});
}