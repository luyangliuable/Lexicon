const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 9000;
const lexiconStudioRoutes = require("./routes/lexiconStudio");
const parsingEngineRoutes = require("./routes/parsingEngine");

app.use(bodyParser.json());
app.use(cors());
app.use("/", lexiconStudioRoutes);
app.use("/parsingEngine/", parsingEngineRoutes);

// Establishing connection with database
var MONGO_URL = "mongodb://localhost:27017";
var old = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jyksr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URL).then(
    () => {
        app.listen(PORT, () => {
            console.log("The server is running 🔥 ...");
        });
    }
).catch(
    err => {
        console.log(err);
    }
);
