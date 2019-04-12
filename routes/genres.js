const express = require('express');
const genresRouter = express.Router();
const Joi = require('joi');
const Genra = require('../schemas/genre');

/*
 * Gets all the genres
 */
genresRouter.get('/', (req, res) => {
    
    let genres = Genra.find().exec();
    res.send(genres);
});

/*
 * Gets an specific genre by id
 */
genresRouter.get('/:id', (req, res) => {
    let genre = genres.find(a => a.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('The genre with the given id was not found');
    res.send(genre);
});

/**
 * Creates a new genre
 */
genresRouter.post('/', (req, res) => {
    let { error } = ValidateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        "id": genres.length + 1,
        "name": req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

/**
 * Updates an specific genre by id
 */
genresRouter.put('/:id', (req, res) => {
    let genre = genres.find(a => a.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given id was not found');
    let { error } = ValidateGenre(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    genre.name = req.body.name;
    res.send(genre);
});

/**
 * Deletes a genre by id 
 */
genresRouter.delete('/:id', (req, res) => {
    let genre = genres.find(a => a.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found');

    let indexGenre = genres.indexOf(genre);
    genres.splice(indexGenre, 1);
    res.send(genre);
});

/*
 * Validates some properties with JOI
 */
function ValidateGenre(genre) {
    const genreSchema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, genreSchema);
}

module.exports = genresRouter;