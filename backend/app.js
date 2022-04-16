const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 9000;
const lexiconStudioRoutes = require("./routes/lexiconStudio");

app.use(bodyParser.json());
app.use(cors());
app.use("/", lexiconStudioRoutes);

// Establishing connection with database
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jyksr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(
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
