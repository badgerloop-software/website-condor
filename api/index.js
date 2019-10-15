let http = require("http");
let https = require("https");
let url = require("url");
let fs = require("fs");
let querystring = require("querystring");
let MongoClient = require("mongodb").MongoClient;
let ObjectId = require('mongodb').ObjectID;
let creds = require("./creds.json");
const client = new MongoClient(creds.dbURL);

http.createServer((request, response) => {
    let pathName = url.parse(request.url).pathname;

    if (pathName === "/teamleads" && request.method === "GET") {
        getTeamleads().then((result) => {
            return formatData(result, "Team");
        }).then((result) => {
            response.end(JSON.stringify(result));
        }).catch((err) => {
            //TODO: do something with error
            response.end("ERROR");
        });
    }

    if (pathName === "/sponsors" && request.method === "GET") {
        getSponsors().then((result) => {
            return formatData(result, "tier");
        }).then((result) => {
            response.end(JSON.stringify(result));
        }).catch((err) => {
            console.log(err);
        });
    }

    if (pathName === "/index" && request.method === "GET") {
        getSponsors().then((result) => {
            return formatData(result, "tier");
        }).then((result) => {
            response.end(JSON.stringify(result));
        }).catch((err) => {
            console.log(err);
        });
    }

}).listen(creds.port);

function getTeamleads() {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(creds.dbURL, { useNewUrlParser: true });

        client.connect((err) => {
            if (err) reject(err);

            let db = client.db(creds.db);
            let collection = db.collection("teamleads");

            let options = {
                "sort": "Position"
            };

            collection.find({}, options).toArray((err, docs) => {
                if (err) reject(err);

                resolve(docs);
            });
        });
    });
}

function getSponsors() {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(creds.dbURL, { useNewUrlParser: true });

        client.connect((err) => {
            if (err) reject(err);

            let db = client.db(creds.db);
            let collection = db.collection("sponsors");

            let options = {
                "sort": "company"
            };

            collection.find({}, options).toArray((err, docs) => {
                if (err) reject(err);

                resolve(docs);
            });
        });
    });
}

//key: key to create parent elements based off of
function formatData(data, key) {
    return new Promise((resolve, reject) => {
        let result = {};

        for (x of data) {
            if (result[x[key]]) {
                result[x[key]].push(x);
            } else {
                result[x[key]] = [];
                result[x[key]].push(x);
            }
        }

        resolve(result);
    });
}