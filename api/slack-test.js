let http = require('http');

let options = {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}

let postData = "client_id=9805681026.611569686961&client_secret&30c96b9f8e9ccb788a3f92ce70c4d9fe&code=9805681026.620073766150.6705d9dff12c8ca144e70ea2a1f8fe589bafa99f07c9db30b76a3fff4fb0b653"

let request1 = http.request("http://slack.com/api/oauth.access", options, (res) => {
    let resp;
    res.on('data', (chunk) => {
        resp += chunk;
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

request1.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

request1.write(postData);
request1.end();