const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SponsorsSchema = new Schema({
    tier: { type: String, required: false, max: 100 },
    website: { type: String, required: false, max: 100 },
    company: { type: String, required: false, max: 500 },
    logo: { type: String, required: false, max: 100 },
});


// Export the model
module.exports = mongoose.model('Sponsors', SponsorsSchema);