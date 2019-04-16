const mongoose = require('mongoose');
const Joi = require('joi');
const { Genre } = require('../schemas/genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: [Genre],
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
}));

function validateMovie(movie) {
    const movieSchema = {
        title: Joi().string().min(3).max(50).required(),
        genre: Joi().Array().required(),
        numberInStock: Joi().number().required(),
        dailyRentalRate: Joi().number()
    };

    return Joi.validate(movie, movieSchema);
}

module.exports = {
    Movie: Movie,
    validate: validateMovie
};