//--------------------------------------------------------//
// Module Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const json = express.json;

require("dotenv").config();
const { connectDB } = require("./database/db.js");
//--------------------------------------------------------//
//
//--------------------------------------------------------//
// Config
app.use(bodyParser.urlencoded({ extended: true, limit: "512mb" }));
app.use(json({ limit: "512MB" }));
app.use(cors({ origin: process.env.APP_URL }));
//--------------------------------------------------------//
//
//--------------------------------------------------------//
// Route import
const videoRoutes = require("./routes/Video.js");
const draftRoutes = require("./routes/Draft.js");
const userRoutes = require("./routes/User.js");
const errorHandler = require("./middlewares/Error.js");
//--------------------------------------------------------//
//
//--------------------------------------------------------//
// Assigning Routes
app.use("/video", videoRoutes);
app.use("/draft", draftRoutes);
app.use("/user", userRoutes);
app.use(errorHandler);
//--------------------------------------------------------//
//
//--------------------------------------------------------//
// Starting server
// app.listen(5000, () => {
//     console.log("Running: http://localhost:5000/test");
//     console.log("Listening on port 5000.....");
// });

connectDB("mongodb://127.0.0.1:27017/", function (err) {
    if (err) {
        console.log("Cant connect to MongoDB");
        console.log(err.message);
        process.exit(1);
    } else {
        app.listen(5000, () => {
            console.log("Running: http://localhost:5000/test");
            console.log("Listening on port 5000.....");
        });
    }
});
