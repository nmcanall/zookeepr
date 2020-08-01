const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Instatiate the server
const PORT = process.env.PORT || 3001;
const app = express();

// Parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// Parse incoming JSON data
app.use(express.json());
// Use the routes for html and api
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// Make public folder available
app.use(express.static("public"));

// Make the server listen
app.listen(PORT, () => {
    console.log(`API server on port ${PORT}`);
});