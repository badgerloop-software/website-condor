let MongoClient = require('mongodb');
let http = require('http');
let url = require('url');

 
// Connection URL
const urlDB = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'playground';
 
http.createServer((request, response) => {
  console.log("made server");
  pathName = url.parse(request.url).pathname;
  response.end(pathName);
  console.log("METHOD: " + request.method);
  if (pathName == "/test") {
	console.log("TEST has been reached");
  }

}).listen(3005);

// Use connect method to connect to the server
MongoClient.connect(urlDB, function(err, client) {
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);

  findDocuments(db);

  client.close();
});

const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

  function findDocuments(db) {
    let collection = db.collection('documents');

    collection.find({}).toArray((err, docs) => {
        for (x of docs) {
            console.log(`new line: ${x}`);
            console.log(Object.keys(x));
            for (let i = 0; i < Object.keys(x).length; i++) {
                console.log(`${Object.keys(x)[i]} : ${x[Object.keys(x)[i]]}`);
            }
        }
    });

  }
