//app.js
const express = require('express');
const bodyParser = require('body-parser');

const teamleads = require('./routes/teamleads.route'); // Imports routes for the teamleads
const sponsors = require('./routes/sponsors.route'); // Imports routes for the sponsors
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/PROD', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/teamleads', teamleads);
app.use('/sponsors', sponsors);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
