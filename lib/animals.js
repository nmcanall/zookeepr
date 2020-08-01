const fs = require("fs");
const path = require("path");

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

// Helper function to validate it a new animal is correctly formated
function validateAnimal(animal) {
    if(!animal.name || typeof animal.name != "string") {
        return false;
    }
    if(!animal.species || typeof animal.species != "string") {
        return false;
    }
    if(!animal.diet || typeof animal.diet != "string") {
        return false;
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

// Function to find a specific animal given its ID
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// Function to add a new animal to the animals JSON package
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);

    // Write new animal to JSON file
    fs.writeFileSync(
        path.join(__dirname, "../data/animals.json"),
        JSON.stringify({animals: animalsArray}, null, 2)
    );

    return animal;
}

module.exports = {
    filterByQuery,
    findById, 
    createNewAnimal,
    validateAnimal
};