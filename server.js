const express = require("express");
const {animals} = require("./data/animals.json");

// Instatiate the server
const app = express();

// Helper function to filter results based on query parameters
const filterByQuery = function(query, animalsArray) {
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

// Add route to server
app.get("/api/animals", (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Make the server listen
app.listen(3001, () => {
    console.log("API server on port 3001");
});