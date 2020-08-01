const {filterByQuery, findById, createNewAnimal, validateAnimal} = require("../../lib/animals");
const {animals} = require("../../data/animals.json");
const router = require("express").Router();

// Add route to animals api
router.get("/animals", (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Add route for a specific animal
router.get("/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    }
    else {
        res.sendStatus(404);
    }
});

// Post new data to animals
router.post("/animals", (req, res) => {
    req.body.id = animals.length.toString();
    if(!validateAnimal(req.body)) {
        res.status(400).send("The animal is not properly formated.");
    }
    else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;