const teamleads = require('../models/teamleads.model');


exports.teamleads_create = function (req, res) {
    let teamleads = new teamleads(
        {
            Team: req.body.team,
            Position: req.body.team,
            Name: req.body.team,
            Major: req.body.team,
            Year: req.body.team,
            Picture: req.body.team,
        }
    );

    teamleads.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Teamlead Created successfully');
    });
};

exports.teamleads_details = function (req, res) {
    teamleads.findById(req.params.id, function (err, teamleads) {
        if (err) return next(err);
        res.send(teamleads);
    });
};

exports.teamleads_update = function (req, res) {
    teamleads.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, teamleads) {
        if (err) return next(err);
        res.send('teamlead udpated.');
    });
};

exports.teamleads_delete = function (req, res) {
    teamleads.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};