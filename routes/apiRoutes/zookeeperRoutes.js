const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require("../../lib/zookeepers");
const {zookeepers} = require("../../data/zookeepers.json");
const router = require("express").Router();

// Add route to zookeepers api
router.get("/zookeepers", (req, res) => {
    let results = zookeepers;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Add route for a specific zookeeper
router.get("/zookeepers/:id", (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if(result) {
        res.json(result);
    }
    else {
        res.sendStatus(404);
    }
});

// Post new data to zookeepers
router.post("/zookeepers", (req, res) => {
    req.body.id = zookeepers.length.toString();
    if(!validateZookeeper(req.body)) {
        res.status(400).send("The zookeeper is not properly formated.");
    }
    else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;