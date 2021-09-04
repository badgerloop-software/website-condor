let http = require("http");
let https = require("https");
let url = require("url");
let MongoClient = require("mongodb").MongoClient;
let creds = require("./creds.json");

http.createServer((request, response) => {


    let pathName = url.parse(request.url).pathname;
    console.log(pathName);
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

    else if (pathName === "/sponsors" && request.method === "GET") {
        getSponsors().then((result) => {
            return formatData(result, "tier");
        }).then((result) => {
            response.end(JSON.stringify(result));
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (pathName === "/news" && request.method === "GET") {
        getNewsPosts().then((result) => {
            return formatData(result);
        }).then((result) => {
            response.end(JSON.stringify(result));
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (pathName === "/index" && request.method === "GET") {
        getSponsors().then((result) => {
            return formatData(result, "tier");
        }).then((result) => {
            response.end(JSON.stringify(result));
        }).catch((err) => {
            console.log(err);
        });
    }

    else if (pathName === "/contact" && request.method === "POST") {
        var postData = "";

        request.on("data", function (data) {
            postData += data;
        });

        request.on("end", function () {
            let submission = JSON.parse(postData);
            console.log(submission);
            let message = {
                text: JSON.parse(submission.message)
            };


            let options = {

            }

            let req = https.request(options, (res) => {
                let slackResponse = "";

                res.on("data", (chunk) => {
                    slackResponse += chunk;
                });

                res.on("end", () => {
                    response.statusCode = 200;
                    response.end(slackResponse);
                });
            });

            req.on("error", (e) => {
                response.statusCode = e.statusCode;
                response.end(e.message);
            });

            // write data to request body
            req.write(JSON.stringify(message));
            req.end();
        });
    } else {
        response.statusCode = 404;
        response.end(`Path ${pathName} does not support operation ${request.method}`);
    }

}).listen(creds.port, "0.0.0.0");

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

function getNewsPosts() {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(creds.dbURL, { useNewUrlParser: true });

        client.connect((err) => {
            if (err) reject(err);

            let db = client.db(creds.db);
            let collection = db.collection("news");

            collection.find({}).toArray((err, docs) => {
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