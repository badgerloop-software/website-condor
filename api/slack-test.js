let http = require("http");
let https = require("https");
let querystring = require("querystring");
let creds = require("./creds.json");

function getChannelMembers(channelID) {
    let params = querystring.stringify({
        "token": creds.slackToken,
        "channel": channelID
    });

    let options = {
        host: "slack.com",
        path: `/api/conversations.members?${params}`,
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

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
                return json.members;
            } else {
                //TODO: test this out - make sure we want to move forward returning errors - check if error happens on function call? 
                return new Error(json.error);
            }
        });
    });

    req.on('error', (e) => {
        return e;
    });

    req.end();
}

getChannelMembers("C0CF235QE");