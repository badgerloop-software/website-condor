const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TeamleadsSchema = new Schema({
    Team: { type: String, required: false, max: 100 },
    Position: { type: String, required: false, max: 100 },
    Name: { type: String, required: false, max: 100 },
    Major: { type: String, required: false, max: 100 },
    Year: { type: String, required: false, max: 100 },
    Picture: { type: String, required: false, max: 100 }
});


// Export the model
module.exports = mongoose.model('Teamleads', TeamleadsSchema);