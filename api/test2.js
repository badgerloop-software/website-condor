const express = require('express')
const app = express()

app.post('/contact', function(req, res) {
    var field = req.body;
    console.log(field);
    res.send("Received submission from form");

    if (field.reason == "inquiry") {
        var message =  {
            type: "message",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    contentUrl: null,
                    content: {
                        $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
                        type: "AdaptiveCard",
                        version: "1.0",
                        body: [
                            {
                                type: "Container",
                                items: [
                                    {
                                        type: "FactSet",
                                        facts: [
                                            {
                                                title: "First Name:",
                                                value: field.first
                                            },
                                            {
                                                title: "Last Name:",
                                                value: field.last
                                            },
                                            {
                                                title: "Email:",
                                                value: field.email
                                            },
                                            {
                                                title: "Reason for Contacting:",
                                                value: field.reason
                                            },
                                            {
                                                title: "Major:",
                                                value: field.major
                                            },
                                            {
                                                title: "Year:",
                                                value: field.year
                                            },
                                            {
                                                title: "Teams Interested In:",
                                                value: field.teams
                                            }
                                        ]
                                    },
                                    {
                                        type: "TextBlock",
                                        text: field.message,
                                        wrap: true
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    }
    else if (field.reason == "media" || field.reason == "sponsorship") {
        var message =  {
            type: "message",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    contentUrl: null,
                    content: {
                        $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
                        type: "AdaptiveCard",
                        version: "1.0",
                        body: [
                            {
                                type: "Container",
                                items: [
                                    {
                                        type: "FactSet",
                                        facts: [
                                            {
                                                title: "First Name:",
                                                value: field.first
                                            },
                                            {
                                                title: "Last Name:",
                                                value: field.last
                                            },
                                            {
                                                title: "Email:",
                                                value: field.email
                                            },
                                            {
                                                title: "Reason for Contacting:",
                                                value: field.reason
                                            },
                                            {
                                                title: "Organization/Company:",
                                                value: field.company
                                            },
                                        ]
                                    },
                                    {
                                        type: "TextBlock",
                                        text: field.message,
                                        wrap: true
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    }
    else if (field.reason == "other") {
        var message =  {
            type: "message",
            attachments: [
                {
                    contentType: "application/vnd.microsoft.card.adaptive",
                    contentUrl: null,
                    content: {
                        $schema: "https://adaptivecards.io/schemas/adaptive-card.json",
                        type: "AdaptiveCard",
                        version: "1.0",
                        body: [
                            {
                                type: "Container",
                                items: [
                                    {
                                        type: "FactSet",
                                        facts: [
                                            {
                                                title: "First Name:",
                                                value: field.first
                                            },
                                            {
                                                title: "Last Name:",
                                                value: field.last
                                            },
                                            {
                                                title: "Email:",
                                                value: field.email
                                            },
                                            {
                                                title: "Reason for Contacting:",
                                                value: field.reason
                                            },
                                        ]
                                    },
                                    {
                                        type: "TextBlock",
                                        text: field.message,
                                        wrap: true
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    }

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://outlook.office.com/webhook/900f23c7-cd2d-41c9-a89b-b9d8920dc0ca@2ca68321-0eda-4908-88b2-424a8cb4b0f9/IncomingWebhook/c037fd02349a422d87a8b6509f4a65c8/67a0d603-89bc-44ce-b182-b21d878f7670',
        'headers': {
            'Content-Type': ['application/json']
        },
        json: message
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        console.log(response.body);
    });

    });

app.listen(3006, function() {
    console.log("Listening on port 3006");
});

