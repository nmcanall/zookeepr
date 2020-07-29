const express = require("express");
const {animals} = require("./data/animals.json");

// Instatiate the server
const PORT = process.env.PORT || 3001;
const app = express();

// Helper function to filter results based on query parameters
function filterByQuery(query, animalsArray) {
    let filteredResults = animalsArray;

    // Filter by name
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    // Filter by species
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    // Filter by diet
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }

    // Filter by personality traits
    let personalityTraitsArray = [];
    if(query.personalityTraits) {

        // Ensure it's an array
        if(typeof query.personalityTraits === "string") {
            personalityTraitsArray = [query.personalityTraits];
        }
        else {
            personalityTraitsArray = query.personalityTraits;
        }

        // Loop through each personality trait and add to filter
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }
    return filteredResults;
}

// Function to find a specific animal given its ID
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// Add route to server
app.get("/api/animals", (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Add route for a specific animal
app.get("/api/animals/:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    }
    else {
        res.sendStatus(404);
    }
})

// Make the server listen
app.listen(PORT, () => {
    console.log(`API server on port ${PORT}`);
});