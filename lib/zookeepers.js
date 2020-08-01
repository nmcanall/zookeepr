const fs = require("fs");
const path = require("path");

// Helper function to filter results based on query parameters
function filterByQuery(query, zookeepers) {
    let filteredResults = zookeepers;

    // Filter by name
    if(query.name) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.name === query.name);
    }

    // Filter by age
    if(query.age) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.age === Number(query.age));
    }

    // Filter by favoriteAnimal
    if(query.favoriteAnimal) {
        filteredResults = filteredResults.filter(zookeeper => zookeeper.favoriteAnimal === query.favoriteAnimal);
    }

    return filteredResults;
}

// Helper function to validate it a new zookeeper is correctly formated
function validateZookeeper(zookeeper) {
    if(!zookeeper.name || typeof zookeeper.name != "string") {
        return false;
    }
    if(!zookeeper.age || typeof zookeeper.age != "number") {
        return false;
    }
    if(!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal != "string") {
        return false;
    }
    return true;
}

// Function to find a specific zookeeper given its ID
function findById(id, zookeepers) {
    const result = zookeepers.filter(zookeeper => zookeeper.id === id)[0];
    return result;
}

// Function to add a new zookeeper to the zookeepers JSON package
function createNewZookeeper(body, zookeepers) {
    const zookeeper = body;
    zookeepers.push(zookeeper);

    // Write new zookeeper to JSON file
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({zookeepers}, null, 2)
    );

    return zookeeper;
}

module.exports = {
    filterByQuery,
    findById, 
    createNewZookeeper,
    validateZookeeper
};