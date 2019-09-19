const sponsors = require('../models/sponsors.model');
const Sponsors = require('../models/teamleads.model');


exports.sponsors_create = function (req, res) {
    let sponsors = new Sponsors(
        {
            Team: req.body.team,
            Position: req.body.team,
            Name: req.body.team,
            Major: req.body.team,
            Year: req.body.team,
            Picture: req.body.team,
        }
    );

    sponsors.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Sponsor Created successfully');
    });
};

exports.sponsors_details = function (req, res) {
    sponsors.findById(req.params.id, function (err, sponsors) {
        if (err) return next(err);
        res.send(sponsors);
    });
};

exports.sponsors_update = function (req, res) {
    sponsors.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, sponsors) {
        if (err) return next(err);
        res.send('sponsor udpated.');
    });
};

exports.sponsors_delete = function (req, res) {
    sponsors.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    });
};