const mongoose = require('mongoose');
// Model for User base

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

// userSchema.statics.finder = async function() {
//     return this.find().sort('first_name');
// };

// const User = mongoose.model('Guests', userSchema);
module.exports = mongoose.model('Users', userSchema);
