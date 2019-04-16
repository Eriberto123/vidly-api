const mongoose = require('mongoose');
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 60 }
}));

/*
 * Validates some properties with JOI
 */
function validateGenre(genre) {
    const genreSchema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, genreSchema);
}

module.exports = {
    Genre: Genre,
    validate: validateGenre
};