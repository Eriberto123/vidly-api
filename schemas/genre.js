const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 60 }
});

module.exports = mongoose.model('Course', genreSchema);