let http = require("http");
let https = require("https");
let url = require("url");
let fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let creds = require("./creds.json");

http.createServer((request, response) => {
    let pathName = url.parse(request.url).pathname;

    
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

    if (pathName === "/emailResponse" && request.method === "POST") {
        let postData = "";

        request.on("data", function (data) {
            postData += data;
        });

        request.on("end", function () {
            sendNewStudentEmail(JSON.parse(postData));
        });
    }
}).listen(creds.port);

function getTeams() {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(creds.dbURL);

        client.connect(function (err) {
            if (!err) {
                let db = client.db(creds.db);
                db.collection("sponsors").distinct("tier", (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result === null) {
                        //TODO: figure out what empty result returns as.
                        reject(
                            "Empty object returned from MongoDB in getTeamLeads() within api/index.js"
                        );
                    } else {
                        resolve(result);
                    }
                });

                client.close();
            } else {
                reject(err);
            }
        });
    });
}

function getTeamLeads(team) {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(creds.dbURL);

        client.connect(function (err) {
            if (!err) {
                let db = client.db(creds.db);
                db.collection("sponsors")
                    .find({ tier: tier })
                    .toArray((err, result) => {
                        if (err) {
                            reject(err);
                        } else if (result == {}) {
                            //TODO: figure out what empty result returns as.
                            reject(
                                "Empty object returned from MongoDB in getTeamLeads() within api/index.js"
                            );
                        } else {
                            resolve(result);
                        }
                    });
            } else {
                reject(err);
            }

            client.close();
        });
    });
}

function getTeamLeadsDriver(teams) {
    return new Promise((resolve, reject) => {
        let promiseList = [];
        let resultObject = {};
        for (let x of teams) {
            promiseList.push(
                getTeamLeads(x).then((result) => {
                    resultObject[x] = result;
                })
            );
        }

        Promise.all(promiseList).then(() => {
            resolve(resultObject);
        });
    });
}

function getTiers() {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(creds.dbURL);

        client.connect(function (err) {
            if (!err) {
                let db = client.db(creds.db);
                db.collection("sponsors").distinct("tier", (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result === null) {
                        //TODO: figure out what empty result returns as.
                        reject(
                            "Empty object returned from MongoDB in getTeamLeads() within api/index.js"
                        );
                    } else {
                        resolve(result);
                    }
                });

                client.close();
            } else {
                reject(err);
            }
        });
    });
}

function getSponsors() {
    return new Promise((resolve, reject) => {
        let client = new MongoClient(creds.dbURL);

        client.connect(function (err) {
            if (!err) {
                let db = client.db(creds.db);
                db.collection("teamleads").distinct("Team", (err, result) => {
                    if (err) {
                        reject(err);
                    } else if (result === null) {
                        //TODO: figure out what empty result returns as.
                        reject(
                            "Empty object returned from MongoDB in getTeamLeads() within api/index.js"
                        );
                    } else {
                        resolve(result);
                    }
                });

                client.close();
            } else {
                reject(err);
            }
        });
    });
}

function getSponsorsDriver(tiers) {
    return new Promise((resolve, reject) => {
        let promiseList = [];
        let resultObject = {};
        for (let x of tiers) {
            promiseList.push(
                getSponsors(x).then((result) => {
                    resultObject[x] = result;
                })
            );
        }

        Promise.all(promiseList).then(() => {
            resolve(resultObject);
        });
    });
}

function sendNewStudentEmail(emailAddr) {
    var stream = fs.createWriteStream("mailScript.sh"); //creates a write stream to mailScript.sh script file
    stream.once("open", function (fd) {
        //file descriptor so you will be able to close stream
        stream.write("(\n"); //open script
        stream.write("  echo To: " + emailAddr + "\n"); //sets recipient to the address
        stream.write("  echo From: noreply@badgerloop.com\n"); // sets the from address to noreply@badgerloop.com
        stream.write('  echo "Content-Type: text/html; "\n'); // says the email will be in HTML format
        stream.write("  echo Subject: Badgerloop Form Submission Autoreply\n"); // sets subject of email
        stream.write("  echo\n");
        stream.write("  cat mail.html\n"); // points the the mail content file
        stream.write(") | sendmail -t\n"); // closes the script, then sends the mail using PostFix
        stream.end(); //finishes writing the file
    });

    //code to actually execute the script
    const exec = require("child_process").exec;
    var yourscript = exec(
        "sh mailScript.sh", //command to run that executes the script
        (error, stdout, stderr) => {
            console.log(`${stdout}`);
            console.log(`${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        }
    );
}
