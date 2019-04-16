const express = require('express');
const genresRouter = express.Router();
const { Genre, validate } = require('../schemas/genre');

/*
 * Gets all the genres
 */
genresRouter.get('/', async (req, res) => {
    let genres = await Genre.find().sort({ name: 1 }).exec();
    res.send(genres);
});

/*
 * Gets an specific genre by id
 */
genresRouter.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let genre = await Genre.findById(id).exec();
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
    try {
        let { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let genre = new Genre({
            name: req.body.name
        });
        await genre.validate();
        genre = await genre.save();
        res.send(genre);
    } catch (error) {
        console.error(error);
        res.status(500).send('There was something wrong in the server ', error.message);
    }
});

/**
 * Updates an specific genre by id
 */
genresRouter.put('/:id', async (req, res) => {
    let genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given id was not found');
    let { error } = validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    let result = await Genre.findOneAndUpdate(req.params.id, {
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
    let genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given id was not found');
    let deleted = await Genre.findOneAndDelete(req.body.id);
    res.send(deleted);
});

module.exports = genresRouter;