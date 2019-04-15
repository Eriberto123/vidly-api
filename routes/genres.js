const express = require('express');
const genresRouter = express.Router();
const Joi = require('joi');
const Genra = require('../schemas/genre');

/*
 * Gets all the genres
 */
genresRouter.get('/', async (req, res) => {
    let genres = await Genra.find().sort({ name: 1 }).exec();
    res.send(genres);
});

/*
 * Gets an specific genre by id
 */
genresRouter.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let genre = await Genra.findById(id).exec();
        if (!genre) res.send('The genre with the given id was not found');
        res.send(genre);
    } catch (error) {
        console.error(error);
    }
});

/**
 * Creates a new genre
 */
genresRouter.post('/', async (req, res) => {
    let { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genra({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(result);
});

/**
 * Updates an specific genre by id
 */
genresRouter.put('/:id', async (req, res) => {
    let genre = await Genra.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given id was not found');
    let { error } = ValidateGenre(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let result = await Genra.findOneAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    }, { new: true });
    res.send(result);
});

/**
 * Deletes a genre by id 
 */
genresRouter.delete('/:id', async (req, res) => {
    let genre = await Genra.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given id was not found');
    let deleted = await Genra.findOneAndDelete(req.body.id);
    res.send(deleted);
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