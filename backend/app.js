//  Necessary packages for the app.
//  - fs module is used to read & write into files easily on server
//  - path module provides a way of working with directories and file paths
//  - cors allow to make cross-origin requests cause client and server will be running on differents ports
const express = require("express");
// const fs = require('fs');
const cors = require("cors");
// const path = require('path');
const app = express();
require("dotenv").config();

app.use(
  express.json({
    limit: "512MB",
  })
);
var corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Route import
const animationRoutes = require("./routes/Animation.js");
const videoRoutes = require("./routes/Video.js");

const draftRoutes = require("./routes/Draft.js");
const userRoutes = require("./routes/User.js");
const { connectDB } = require("./database/db.js");

// Routes
app.get("/", function (req, res) {
  const htmlcode = `
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>HTTP Video Stream From MongoDB</title>
    </head>
    <body>
    <video controls autoPlay crossorigin="anonymus">
    <source src="http://localhost:5000/video/6586a41f4c05f7c32a067141" type="video/mp4">
  </video>
    </body>
  </html>
  
  `;
  res.send(htmlcode);
});

app.use("/animation", cors(corsOptions), animationRoutes);
app.use(cors());
app.use("/video", videoRoutes);
app.use("/draft", draftRoutes);
app.use("/user", userRoutes);
app.use((err, req, res, next) => {
  res.status(400).json({ msg: "message from error handler" });
});

// listen to our server
connectDB(process.env.MONGO_URL, function (err) {
  if (err) {
    console.log("Cant connect to MongoDB");
    process.exit(1);
  } else {
    app.listen(5000, () => {
      console.log("Listening on port 5000.....");
    });
  }
});
