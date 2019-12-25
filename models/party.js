const mongoose = require('mongoose');
const moment = require('moment');

const partySchema = new mongoose.Schema({
    name: String,
    location: String,
    date: String,
    status: false
});

// userSchema.statics.finder = async function() {
//     return this.find().sort('first_name');
// };

module.exports = mongoose.model('Party', partySchema);