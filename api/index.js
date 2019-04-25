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

    if (pathName === "/admin" && request.method === "GET") {
        let userID = getSlackUserID();
        let channelIDs = getSlackChannels();
        if (validUser(userID, channelIDs)) {

        } else {
            //TODO: render error page.
        }
    }

    if (pathName === "/teamleads" && request.method === "GET") {
        getTeamleads().then((result) => {
            return formatData(result, "Team");
        }).then((result) => {
            response.end(JSON.stringify(result));
        }).catch((err) => {
            //TODO: do something with error
            response.end("ERROR");
        })
    }

    if (pathName === "/teamleads" && request.method === "PUT") {
        let data = "";

        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            updateDatabase(JSON.parse(data), "teamleads").then((result) => {
                //TODO: return number of results changed? 
                response.end("OK");
            }).catch((err) => {
                response.statusCode = 500;
                response.end(JSON.stringify(err.message));
            }).finally(() => {
                client.close();
            });
        });
    }

    if (pathName === "/teamleads" && request.method === "POST") {

    }

    if (pathName === "/teamleads" && request.method === "DELETE") {

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
    /**
     * Updates the document with whatever is passed in via data.
     * incomming data:
     * {
     * _id: <object ID>,
     * data: {
     *          <Field to update>: <new data>,
     *           ...
     *         }
     * }
     */
    if (pathName === "/sponsors" && request.method === "PUT") {
        let data = "";

        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            updateDatabase(JSON.parse(data), "sponsors").then((result) => {
                response.end("OK");
            }).catch((err) => {
                response.statusCode = 500;
                response.end(JSON.stringify(err.message));
            }).finally(() => {
                client.close();
            });
        });
    }

    if (pathName === "/sponsors" && request.method === "POST") {

    }

    if (pathName === "/sponsors" && request.method === "DELETE") {

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
    /**
     * Updates the document with whatever is passed in via data.
     * incomming data:
     * {
     * _id: <object ID>,
     * data: {
     *          <Field to update>: <new data>,
     *           ...
     *         }
     * }
     */
    if (pathName === "/index" && request.method === "PUT") {
        let data = "";

        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', () => {
            updateDatabase(JSON.parse(data), "sponsors").then((result) => {
                response.end("OK");
            }).catch((err) => {
                response.statusCode = 500;
                response.end(JSON.stringify(err.message));
            }).finally(() => {
                client.close();
            });
        });
    }

    if (pathName === "/index" && request.method === "POST") {

    }

    if (pathName === "/index" && request.method === "DELETE") {

    }

    if (pathName === "/contact" && request.method === "POST") {
        var postData = "";

        request.on("data", function (data) {
            postData += data;
        });

        request.on("end", function () {
            let message = {
                text: JSON.parse(postData)
            };

            let options = {
                hostname: "hooks.slack.com",
                path: "/services/T09PPL10S/BD948FF24/9HsUZ9zw7TtifqC4TPLT8eRB",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            };

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
            }

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
            }

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

function updateDatabase(json, collecName) {
    return new Promise((resolve, reject) => {
        if (!json._id) reject("Empty set passed in");

        let client = new MongoClient(creds.dbURL, { useNewUrlParser: true });

        client.connect((err) => {
            if (err) reject(err);

            let db = client.db(creds.db);
            let collection = db.collection(collecName);
            collection.updateOne({ "_id": new ObjectId(json._id) }, { $set: json.data }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            }).finally(() => {
                client.close();
            })
        })
    });
}

/**
 * Transforms the temporary code granted by the sign in with slack process into 
 * a user token which also gives us the user's ID.
 * More information about the sign in with slack process can be found here: 
 * https://api.slack.com/docs/sign-in-with-slack
 * @param <string> code: the temporary code granted by the first step of slack's 
 * oauth process. 
 * @returns <string>: Slack user ID associated with the temporary code
 */
function getSlackUserID(code) {
    let postData = querystring.stringify({
        "code": code,
        "client_id": creds.slackAppCID,
        "client_secret": creds.slackAppSec,
    });

    // HTTP request options
    let options = {
        host: "slack.com",
        path: "/api/oauth.access",
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let req = https.request(options, (res) => {
        res.setEncoding("utf8");
        let data = "";

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            let json = JSON.parse(data);
            // valid response from slack
            if (json.ok === true) {
                return json.user.id;
            } else {
                //TODO: test this out - make sure we want to move forward returning errors - check if error happens on function call? 
                return new Error(json.error);
            }
        });
    });

    req.on('error', (e) => {
        return e;
    });
}

/**
 * Gets a list of all Slack channel IDs that we will allow members of those 
 * channels to edit pages on the website. These channels are listed in the 
 * creds.json file.
 * 
 * @returns <array>: list of channels
 */
function getSlackChannels() {
    let ids = [];
    for (x in creds.slackAdminChannels) {
        ids.push(creds.slackAdminChannels[x]);
    }

    return ids;
}