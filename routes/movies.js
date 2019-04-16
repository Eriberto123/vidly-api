const express = require('express');
const movieRouter = express.Router();
const { Movie, validate } = require('../schemas/movie');

movieRouter.get('/', async (req, res) => {
    const movies = await Movie.find().sort({ name: 1 }).exec();
    res.send(movies);
});

movieRouter.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id).exec();
    if (!movie) res.status(404).send('The movie with the given ID was not found');
    res.send(movie);
});

movieRouter.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    let movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
});

movieRouter.put('/:id', async (req, res) => {
     
});